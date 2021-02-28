const crypto = require('crypto');

function HMAC_sha256(text) {
  const secret = 'yicheng';
  const hash = crypto.createHmac('sha256', secret)
    .update(text)
    .digest('hex');
  return hash;
}
