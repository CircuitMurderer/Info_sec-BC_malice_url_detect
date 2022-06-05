const Web3 = require('web3');
const fs = require("fs");
const myTools = require('./myTools');
const web3 = new Web3("ws://localhost:8545");
console.log(web3.version);
let attackerinput = fs.readFileSync('attacker_input.json').toString();
attackerinput = JSON.parse(attackerinput);
console.log("attacker_input:");
console.log(attackerinput);
web3.eth.personal.getAccounts()
.then((accounts) =>{
    web3.eth.defaultAccount = accounts[0];
    console.log("accounts:");
    console.log(accounts);
    console.log("default account:" + web3.eth.defaultAccount);
    for (let index = 0; index < attackerinput.bad_number; index++) {
        web3.eth.sendTransaction({
            to: accounts[index%10],
            data: myTools.urlToHex(attackerinput.bad_sites[index])
        }).on('transactionHash', function(hash){
            //console.log("txhash: " + hash);
            web3.eth.getTransaction(hash)
            .then((tx) =>{
                console.log("new bad site:\t" + myTools.hexToUrl(tx.input));
            });
        });
    }
    for (let index = 0; index < attackerinput.good_numbe; index++) {
        web3.eth.sendTransaction({
            to: accounts[index%10],
            data: myTools.urlToHex(attackerinput.good_sites[index])
        }).on('transactionHash', function(hash){
            //console.log("txhash: " + hash);
            web3.eth.getTransaction(hash)
            .then((tx) =>{
                console.log("new good site:\t" + myTools.hexToUrl(tx.input));
            });
        });
    }
    
    
});