
//var express = require('express')
//var https = require('https')
//var fs = require('fs')

//var server_port = process.env.OPENSHIFT_NODEJS_PORT || 443
//var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'


//var app = express()


if (typeof process.env.OPENSHIFT_NODEJS_PORT === 'undefined') {

    //    var server = app.listen(server_port, server_ip_address, function () {
    //        console.log('Local example app listening at https://%s:%s', server_ip_address, server_port)
    //    });

    //    app.get('/', function (req, res) {
    //        res.send('Hello World from Express in SSL!!!')
    //    })

    ////} else {

    ////    var options = {
    ////        key: fs.readFileSync('server.key'),
    ////        cert: fs.readFileSync('server.crt'),
    ////        requestCert: false,
    ////        rejectUnauthorized: false
    ////    };

    ////    app.get('/', redirectSec, function (req, res) {
    ////        res.send('Hello World redirected from Express in SSL!!!')
    ////    })


    ////    function redirectSec(req, res, next) {
    ////        if (req.headers['x-forwarded-proto'] == 'http') {
    ////            res.redirect('https://' + req.headers.host + req.path);
    ////        } else {
    ////            return next();
    ////        }
    ////    }

    ////    https.createServer(options, app).listen(server_port, server_ip_address, function () {
    ////        console.log('Example app listening at https://%s:%s', server_ip_address, server_port)
    ////    });
    ////}


    var express = require('express');
    var https = require('https');
    var fs = require('fs');

    var server_port = process.env.OPENSHIFT_NODEJS_PORT || 443;
    var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


    var options = {
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.crt'),
        requestCert: false,
        rejectUnauthorized: false
    };

    var app = express();

    app.get('/', function (req, res) {
        res.send('Hello World from Express in SSL!!!')
    });

    https.createServer(options, app).listen(server_port, server_ip_address, function () {
        console.log('Example app listening at https://%s:%s', server_ip_address, server_port)
    });

} else {


    var express = require('express');
    var https = require('https');
    var fs = require('fs');

    var server_port = process.env.OPENSHIFT_NODEJS_PORT || 443;
    var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
    

    var app = express();

    app.get('/', redirectSec, function (req, res) {
        res.send('Hello World redirected from Express in SSL!!!')
    })


    function redirectSec(req, res, next) {
        if (req.headers['x-forwarded-proto'] == 'http') {
            res.redirect('https://' + req.headers.host + req.path);
        } else {
            return next();
        }
    }

    app.listen(server_port, server_ip_address, function () {
        console.log('Example app listening at https://%s:%s', server_ip_address, server_port)
    });

}