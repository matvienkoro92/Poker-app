#!/usr/bin/env node
"use strict";
// Dry-run by default. Moves only files referenced by persisted chat messages,
// not public profile-wall photos. Production credentials must be supplied by the operator.
const { pipeline, isConfigured } = require("../lib/redis");
const { migrationKey } = require("../lib/chat-media-migration");
const { isChatBlobUrl } = require("../lib/chat-media-access");
const { get, put, del } = require("@vercel/blob");
const crypto = require("node:crypto");
const apply = process.argv.includes("--apply");
const maxBytes = 9 * 1024 * 1024;
async function commands(rows) {
  return pipeline(rows,{context:"chat.media-migrate",throwOnError:true});
}
async function readBlob(src,access,token) {
  const result = await get(src,{access,token});
  if (!result || result.statusCode !== 200 || !result.stream) throw new Error("Attachment read failed");
  const chunks=[];let size=0;
  for await (const chunk of result.stream) {
    size+=chunk.length;if(size>maxBytes)throw new Error("Attachment exceeds migration limit");chunks.push(Buffer.from(chunk));
  }
  return {bytes:Buffer.concat(chunks),mime:result.blob.contentType||"application/octet-stream"};
}
async function main() {
  if(!isConfigured() || !process.env.BLOB_READ_WRITE_TOKEN) throw new Error("Redis and public Blob credentials are required");
  const sources = new Set();
  for(const pattern of ["poker_app:chat_messages","poker_app:chat:*","poker_app:chat_group_msgs:*"]) {
    let cursor="0",pages=0;
    do {
      if(++pages>10000)throw new Error("Scan limit reached; no files were deleted");
      const reply=(await commands([["SCAN",cursor,"MATCH",pattern,"COUNT","100"]]))[0].result;
      cursor=String(reply[0]);
      for(const key of reply[1]) {
        if((await commands([["TYPE",key]]))[0].result!=="list")continue;
        for(let offset=0;;offset+=100) {
          if(offset>=1000000)throw new Error("Thread limit reached; no files were deleted");
          const messages=(await commands([["LRANGE",key,String(offset),String(offset+99)]]))[0].result;
          for(const raw of messages) {
            const message=JSON.parse(raw);
            for(const field of ["image","voice","document"]) {
              const src=message[field];
              if(typeof src==="string"&&isChatBlobUrl(src)&&new URL(src).hostname.includes(".public."))sources.add(src);
            }
          }
          if(messages.length<100)break;
        }
      }
    }while(cursor!=="0");
  }
  console.log(JSON.stringify({mode:apply?"apply":"dry-run",referencedPublicAttachments:sources.size}));
  if(!apply)return;
  let completed=0;
  for(const src of sources) {
    const key=migrationKey(src);
    let destination=(await commands([["GET",key]]))[0].result;
    if(!destination) {
      const {bytes,mime}=await readBlob(src,"public",process.env.BLOB_READ_WRITE_TOKEN);
      if(process.env.CHAT_BLOB_READ_WRITE_TOKEN) {
        const out=await put("chat/migrated/"+crypto.randomUUID(),bytes,{access:"private",token:process.env.CHAT_BLOB_READ_WRITE_TOKEN,contentType:mime,addRandomSuffix:true});
        const verified=await readBlob(out.url,"private",process.env.CHAT_BLOB_READ_WRITE_TOKEN);
        if(!verified.bytes.equals(bytes))throw new Error("Private copy verification failed");
        destination=out.url;
      } else {
        destination="data:"+mime+";base64,"+bytes.toString("base64");
      }
      await commands([["SET",key,destination,"NX"]]);
      destination=(await commands([["GET",key]]))[0].result;
      if(!destination)throw new Error("Migration mapping was not persisted");
    }
    if(isChatBlobUrl(destination)&&new URL(destination).hostname.includes(".private.")) {
      await readBlob(destination,"private",process.env.CHAT_BLOB_READ_WRITE_TOKEN);
    } else if(!/^data:(?:image\/|audio\/|application\/pdf;)[^,]*;?base64,/.test(destination)) {
      throw new Error("Unexpected migration destination; source retained");
    }
    // The proxy now serves the verified private copy via this durable mapping.
    await del(src,{token:process.env.BLOB_READ_WRITE_TOKEN});
    completed++;
    console.log(JSON.stringify({completed,total:sources.size}));
  }
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
