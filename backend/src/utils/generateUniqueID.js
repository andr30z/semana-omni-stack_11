
const crypto = require('crypto');

module.exports = {
  generateUniqueID() {
    return crypto.randomBytes(4).toString('HEX');
  }
}