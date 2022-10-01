const {BlockChain,Transaction,Block} = require("./blockchain")
const User = require("./keygenerator");

charanz = new BlockChain();
var first_user = new User();
var one = new Transaction(first_user.getPublicKey(),"random_one",100,Date.now());
one.signTransaction(first_user.getPrivateKey());
one.verify();
var two = new Transaction(first_user.getPublicKey(),"random_two",1000,Date.now());
two.signTransaction(first_user.getPrivateKey());
two.verify();
charanz.addTransaction(one);
charanz.addTransaction(two);
var second_user = new User();
var four = charanz.mineBlock(second_user.getPublicKey());
// console.log(four);

// console.log(charanz.getAmount("random_one"));
// console.log(charanz.getAmount(second_user.getPublicKey()));
var three = new Transaction(first_user.getPublicKey(),"random_one",100,Date.now());
three.signTransaction(first_user.getPrivateKey());
three.verify();
charanz.addTransaction(three);
var five = charanz.mineBlock(second_user.getPublicKey());
// console.log(five);
// console.log(charanz.getAmount(second_user.getPublicKey()));
charanz.printChain();
console.log(charanz.verifyChain());
