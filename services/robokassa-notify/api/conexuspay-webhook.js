'use strict';

// Reserved ButlerPay/ConexusPay callback. Do not acknowledge deliveries until
// signature verification, partner binding and durable idempotent storage exist.
module.exports = function (req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method === 'GET' || req.method === 'HEAD') {
    res.statusCode = 200;
    return res.end(req.method === 'HEAD' ? undefined : JSON.stringify({
      service: 'conexuspay-webhook',
      status: 'awaiting_configuration',
      acceptingPayments: false
    }));
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, HEAD, POST');
    res.statusCode = 405;
    return res.end();
  }
  res.statusCode = 503;
  return res.end(JSON.stringify({error: 'webhook_not_configured'}));
};
