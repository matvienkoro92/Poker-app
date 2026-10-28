#!/usr/bin/env node
// Local-only batch OCR, cached by image bytes and OCR source version.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),{spawnSync}=require('node:child_process');
const [source,out]=process.argv.slice(2);if(!source||!out)throw Error('Usage: node scripts/cash-screenshot-ocr.cjs image-directory output-directory');
fs.mkdirSync(out,{recursive:true});
const images=fs.readdirSync(source).filter(f=>/\.(png|jpe?g)$/i.test(f)).sort().map(f=>path.resolve(source,f));if(!images.length)throw Error('No images');
const swift=path.join(__dirname,'rating-vision-ocr.swift');const hash=crypto.createHash('sha256').update(fs.readFileSync(swift));for(const f of images)hash.update(f).update(fs.readFileSync(f));
const cache=path.join(out,'ocr-'+hash.digest('hex').slice(0,16)+'.json');
if(!fs.existsSync(cache)){const result=spawnSync('swift',[swift,...images],{encoding:'utf8',maxBuffer:32*1024*1024});if(result.status!==0)throw Error(result.stderr||'System OCR failed; run with system OCR permission');const data=JSON.parse(result.stdout);if(data.some(f=>!f.tokens.length))throw Error('Empty OCR result; check system OCR permission');fs.writeFileSync(cache,result.stdout);}
const result=spawnSync(process.execPath,[path.join(__dirname,'cash-screenshot-audit.cjs'),cache,out],{stdio:'inherit'});process.exitCode=result.status||0;
