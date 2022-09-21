var crypto = require("crypto");


class Transaction{
    constructor(fromAddress,toAddress,amount,time){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.time = time;
        this.sign = ''
    }
    sign(privateKey){
        const verifiableData = this.fromAddress+this.amount+this.toAddress+this.time;
        const signature = crypto.sign("sha256", Buffer.from(verifiableData), {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
          });
        this.sign = signature.toString('base64');
        return this.sign;
    }
    verify(signature){
        const isVerified = crypto.verify(
            "sha256",
            Buffer.from(verifiableData),
            {
              key: publicKey,
              padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
            },
            Buffer.from(signature,'base64')
          );
          return isVerified;
    }
    

}
class Block{
    constructor(value, id,timestamp, previousHash = ''){
        this.id = id.toString();
        this.value = value.toString();
        this.hash_value = this.calculate_hash();
        this.timestamp = timestamp.toString();
        this.previousHash = previousHash;
        this.nounce = 0;
    }

    create_hash() {
        this.hash_value = this.calculate_hash();
        
        while(this.hash_value.slice(0,4) != "0000"){
            this.nounce += 1;
            this.hash_value = this.calculate_hash();
           
            
        }
        console.log("calculated hash with value", this.value);
        return this.hash_value
    }
    calculate_hash(){
        
        return crypto.createHash('sha256').update(this.value+this.id+this.timestamp+this.previousHash+this.nounce).digest('hex');
    }
    printBlock(){
        return {
            "id":this.id,
            "this.value":this.value,
            "this.hash_value":this.hash_value,
            "this.nounce":this.nounce,
            "this.previous_hash":this.previousHash
        }
    }
    verifyBlock(){
        this.hash_value = this.calculate_hash();
        if(this.calculate_hash().slice(0,4) == "0000"){
            return true;
        }
        else{
            return false;
        }
    }
}

class BlockChain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
    }
    createGenesisBlock(){
        return new Block("Initial Block",0,Date.now(),null);
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash_value;
        newBlock.hash_value = newBlock.create_hash();
        this.chain.push(newBlock);

    }
    addTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }
    printChain(){
        for(var i=0;i<this.chain.length;i++){
            console.log(this.chain[i].printBlock());
        }
    }
    verifyChain(){
        for(var i=1;i<this.chain.length;i++){
            if(this.chain[i].verifyBlock() && this.chain[i].previousHash == this.chain[i-1].hash_value){
                return true;
            }
            else{
                return false;
            }
        }
    }
}

charanz = new BlockChain();
var one = new Block("first_value",1,Date.now())
charanz.addBlock(one);
var two = new Block("third_value",3,Date.now())
charanz.addBlock(two);
var three = new Block("fourth_value",4,Date.now())
charanz.addBlock(three);
console.log(charanz.verifyChain());
charanz.printChain();
one.value = 100;
console.log(charanz.verifyChain());
charanz.printChain();

