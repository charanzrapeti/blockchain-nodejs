const crypto = require("crypto");
const { type } = require("os");

const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa',{
    modulusLength:2048,
    publicKeyEncoding: {
        type:'spki',
        format:'der',
    },
    privateKeyEncoding: {
        type:'pkcs8',
        format:'der',
    }
})

// console.log(publicKey.toString('base64'), privateKey.toString('base64'));

function signit(message,privateKey) {
    GeneratedPrivateKey = crypto.createPrivateKey({
        key:Buffer.from(privateKey,'base64'),
        type:'pkcs8',
        format:'der',
    })
    const sign = crypto.createSign('SHA256');
    sign.update(message);
    sign.end();
    const signature = sign.sign(GeneratedPrivateKey).toString('base64');
    return signature;

}

function verifyit(message, publicKey,signature) {
    GeneratedpublicKey = crypto.createPublicKey({
        key:Buffer.from(publicKey,'base64'),
        type:'spki',
        format:'der',
    })
    const verify = crypto.createVerify("SHA256");
    verify.update(message);
    verify.end();
    let result = verify.verify(GeneratedpublicKey,Buffer.from(signature,'base64'));
    return result;
}

var signature = signit("helloworld",privateKey);
console.log(signature);
var signature = signit("hellowould",privateKey);
console.log(signature);
console.log(verifyit("hellowould",publicKey,signature))