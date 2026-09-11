import handler from "../lib/api-handlers/pokerplus-payment-webhook.js";

// A Web Request preserves the signed bytes; the shared Node API parses JSON.
// https://vercel.com/docs/functions/runtimes/node-js
export default {
  async fetch(request) {
    const headers = new Headers();
    let status = 200;
    const response = {
      setHeader(name, value) { headers.set(name, value); },
      status(code) { status = code; return this; },
      json(body) { return Response.json(body, { status, headers }); },
    };
    return handler({
      method: request.method,
      headers: Object.fromEntries(request.headers),
      body: request.body,
    }, response);
  },
};
