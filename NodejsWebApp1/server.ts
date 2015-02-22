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

var options: any;

if (!process.env.OPENSHIFT_NODEJS_PORT) {
    options = {
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.crt'),
        requestCert: false,
        rejectUnauthorized: false
    };
} else {
    options = {};
}


var app = express()

app.get('/', redirectSec, function (req, res) {
    res.send('Hello World from Express in SSL!!!')
})

https.createServer(options, app).listen(server_port, server_ip_address, function () {
    console.log('Example app listening at https://%s:%s', server_ip_address, server_port)
})

function redirectSec(req, res, next) {
    if (req.headers['x-forwarded-proto'] == 'http') {
        res.redirect('https://' + req.headers.host + req.path);
    } else {
        return next();
    }
}

