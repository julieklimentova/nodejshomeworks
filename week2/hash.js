/**
 * @overview  hash
 */
const Crypto = require('crypto-js');
function hashString (string) {
return Crypto.SHA256(string).toString()
}

console.log(hashString('blablabla'));
