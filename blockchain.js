var crypto = require("crypto");

const elliptic = require("elliptic").ec;
const ec = new elliptic('secp256k1');
class Transaction{
    constructor(fromAddress,toAddress,amount,time){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.time = time;
        this.sign = ''
    }
    signTransaction(privateKey){
        
        const verifiableData = this.fromAddress+this.amount+this.toAddress+this.time;
        const key = ec.keyFromPrivate(privateKey);
        const signature = key.sign(verifiableData,'base64');
        this.sign = signature.toDER('hex');
        return this.sign;
    }
    verify(){
        if(this.fromAddress == "system"){
            return true;
        }
        const verifiableData = this.fromAddress+this.amount+this.toAddress+this.time;
        const key = ec.keyFromPublic(this.fromAddress,'hex');
        const isVerified = key.verify(verifiableData,this.sign);
       
          return isVerified;
    }
    
    

}
class Block{
    constructor(value, id,timestamp, previousHash = ''){
        this.id = id.toString();
        this.value = value;
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
        // console.log("calculated hash with value", this.value);
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
            for(var i=0;i<this.value.length;i++){
                if(!this.value[i].verify()){
                    return false;
                }
                else{
                    return true;
                }
            }
        }
        else{
            return false;
        }
    }
}

class BlockChain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.index = 0;
        this.pendingTransactions = [];
    }
    createGenesisBlock(){
        return new Block("Initial Block",0,Date.now(),null);
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    // addBlock(newBlock){
    //     newBlock.previousHash = this.getLatestBlock().hash_value;
    //     newBlock.hash_value = newBlock.create_hash();
    //     this.chain.push(newBlock);

    // }
    mineBlock(minerAddress){
        for(var i=0;i<this.pendingTransactions.length;i++){
            if(!this.pendingTransactions[i].verify()){
                // console.log("f*ked here in ",this.pendingTransactions[i]);
                return "Block can't be Mined......................... Block is no longer valid \n";
            }
        }
        var block = new Block(this.pendingTransactions,this.index+=1,Date.now());
        block.previousHash = this.getLatestBlock().hash_value;
        block.hash_value = block.create_hash();
        this.chain.push(block);
        this.pendingTransactions = [new Transaction("system",minerAddress,100,Date.now())];
        return "Succesfully Mined the block...........................100 coins have been added to your account \n";
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

    getAmount(address){
        var amount = 0;
        for(var block of this.chain){
            for (var transaction of block.value){
                if(transaction.toAddress == address){
                    amount += transaction.amount;
                }
            }
        }
        return amount;
    }
}

module.exports = {BlockChain,Transaction,Block};