const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestamp, data, previousHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(
            this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)
        ).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2022", "Genesis Block", "0");
    }

    getPreviousBlock() {
        return this.chain[this.chain.length - 1]; 
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getPreviousBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}


let norbiCoin = new Blockchain();
norbiCoin.addBlock(new Block(1, "23/01/2022", { amount: 200 }));
norbiCoin.addBlock(new Block(2, "24/01/2022", { amount: 500 }));

console.log(JSON.stringify(norbiCoin, null, 4));
