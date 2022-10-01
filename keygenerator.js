const crypto = require("crypto");
const elliptic = require("elliptic").ec;
class User{
    constructor(){
      const ec = new elliptic('secp256k1');
      const key = ec.genKeyPair();
      this.publicKey = key.getPublic('hex');
      this.privateKey = key.getPrivate('hex');
    }
    getPublicKey(){
        return this.publicKey;
    }
    getPrivateKey(){
        return this.privateKey;
    }

}

module.exports = User;

// // Create and initialize EC context
// // (better do it once and reuse it)
// var ec = new EC('secp256k1');

// // Generate keys
// var key = ec.genKeyPair();


// publicKey = key.getPublic('hex');
// privateKey = key.getPrivate('hex');
// const message = "helloworldthisisarandommessage";

// const key_private = ec.keyFromPrivate(privateKey);
// const sign = key_private.sign(message,'base64');
// const derSign = sign.toDER('hex');
// const key_public = ec.keyFromPublic(publicKey);
// console.log(key_public);
// console.log(derSign);
// const verify = key_private.verify(message,derSign);
// console.log(verify)

// var EC = require('elliptic').ec;

// var ec = new EC('secp256k1');

// var key = ec.genKeyPair();
// publicKey = key.getPublic('hex');
// privateKey = key.getPrivate('hex');

// var public_key = ec.keyFromPublic(publicKey,'hex')
// var private_key = ec.keyFromPrivate(privateKey);

// function sign(message,private_key){
//     const sign = private_key.sign(message,'base64');
//     const derSign = sign.toDER('hex');
//     console.log("wcond");
//     console.log(derSign);
//     const verify = public_key.verify(message,derSign);
//     console.log(verify)

// }
// sign("0488a802238f80677ba0e80f0552eddd716128a6b46f6144cc16070326fce24a71d7f374ff51e19407f93fe304ce12d2ff5e51c7449812ee4b744c3bb179224ecb100ranmod_one1663925902708",private_key);
// sign("0488a802238f80677ba0e80f0552eddd716128a6b46f6144cc16070326fce24a71d7f374ff51e19407f93fe304ce12bcab5e51c7449812ee4b744c3bb179224ecb100random_two1663925902713",private_key);