//import http = require('http');
//var port = process.env.port || 1337
//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello World\n');
//}).listen(port);


var express = require('express')
var pem = require('pem')
var https = require('https')

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 443
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

// had to set set OPENSSL_CONF=c:/libs/openssl-0.9.8k/openssl.cnf to my Git's SSL folder on Windows. 


pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {

    var app = express()

    app.get('/', function (req, res) {
        res.send('Hello World from Express!!!')
    })

    https.createServer({ key: keys.serviceKey, cert: keys.certificate }, app).listen(server_port, server_ip_address, function () {
        console.log('Example app listening at http://%s:%s', server_ip_address, server_port)
    })
})


