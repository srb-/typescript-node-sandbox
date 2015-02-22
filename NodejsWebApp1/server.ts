//import http = require('http');
//var port = process.env.port || 1337
//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);


var express = require('express')
var https = require('https')
var fs = require('fs')

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 443
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

// had to set set OPENSSL_CONF=c:/libs/openssl-0.9.8k/openssl.cnf to my Git's SSL folder on Windows. 
var options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt'),
    requestCert: false,
    rejectUnauthorized: false
};


var app = express()

app.get('/', function (req, res) {
    res.send('Hello World from Express in SSL!!!')
})

https.createServer(options, app).listen(server_port, server_ip_address, function () {
    console.log('Example app listening at https://%s:%s', server_ip_address, server_port)
})


