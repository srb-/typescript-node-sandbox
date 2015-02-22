var express = require('express');
var app = express();
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 443;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
app.get('/', redirectSec, function (req, res) {
    res.send('Hello World redirected from Express in SSL!!!');
});
function redirectSec(req, res, next) {
    if (req.headers['x-forwarded-proto'] == 'http') {
        res.redirect('https://' + req.headers.host + req.path);
    }
    else {
        return next();
    }
}
if (typeof process.env.OPENSHIFT_NODEJS_PORT === 'undefined') {
    var https = require('https');
    var fs = require('fs');
    var options = {
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.crt'),
        requestCert: false,
        rejectUnauthorized: false
    };
    https.createServer(options, app).listen(server_port, server_ip_address, function () {
        console.log('Example app listening at https://%s:%s', server_ip_address, server_port);
    });
}
else {
    app.listen(server_port, server_ip_address, function () {
        console.log('Example app listening at https://%s:%s', server_ip_address, server_port);
    });
}
//# sourceMappingURL=server.js.map