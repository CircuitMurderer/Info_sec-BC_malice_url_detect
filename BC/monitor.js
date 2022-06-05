const Web3 = require('web3');
const myTools = require('./myTools');
const web3 = new Web3("ws://localhost:8545");
console.log(web3.version);
var subscription = web3.eth.subscribe('newBlockHeaders')
.on("connected", function(subscriptionId){
    console.log("subscriptionId: " + subscriptionId);
})
.on("data", function(blockHeader){
    web3.eth.getTransactionFromBlock(blockHeader.hash, 0)
    .then( function(tx) {
        let url = myTools.hexToUrl(tx.input)
        console.log("new site:\t" + url);
    });
})
.on("error", console.error);


function static_analysis(url) {
    
}
