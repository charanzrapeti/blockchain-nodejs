
const crypto = require("crypto");

// The `generateKeyPairSync` method accepts two arguments:
// 1. The type ok keys we want, which in this case is "rsa"
// 2. An object with the properties of the key
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  // The standard secure default length for RSA keys is 2048 bits
  modulusLength: 2048,
});

const verifiableData = "this need to be verified";

// The signature method takes the data we want to sign, the
// hashing algorithm, and the padding scheme, and generates
// a signature in the form of bytes
var signature = crypto.sign("sha256", Buffer.from(verifiableData), {
  key: privateKey,
  padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
});
signature = signature.toString('base64');
console.log(signature);
console.log(Buffer.from(verifiableData))
// To verify the data, we provide the same hashing algorithm and
// padding scheme we provided to generate the signature, along
// with the signature itself, the data that we want to
// verify against the signature, and the public key
const isVerified = crypto.verify(
  "sha256",
  Buffer.from(verifiableData),
  {
    key: publicKey,
    padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
  },
  Buffer.from(signature,'base64')
);

// isVerified should be `true` if the signature is valid
console.log("signature verified: ", isVerified);