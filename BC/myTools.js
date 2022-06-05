const { constants } = require('buffer');
var sync_request = require('sync-request');

function urlToHex(url) {
    let hex = "0x";
    for (let index = 0; index < url.length; index++) {
        hex = hex + url.charCodeAt(index).toString(16);
    }
    return hex;
}

function hexToUrl(hex) {
    let url = "";
    for (let index = 1; 2*index < hex.length; index++) {
        url = url + String.fromCharCode(parseInt(hex.slice(2*index, 2*index+2),16));
    }
    return url;
}

function urlToHtml(url) {
    var res = sync_request('GET', url);
    console.log("GET " + url+ " statusCode: "+ res.statusCode);
    if(res.statusCode >=300 ) {
        return `${url}: error page!`;
    }
    return res.getBody().toString();
}
/*
let html = urlToHtml( 'http://www.baiduuuu.com');
console.log(html);
*/




module.exports ={
    urlToHex,
    hexToUrl,
    urlToHtml
};
