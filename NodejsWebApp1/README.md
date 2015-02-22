# NodejsWebApp1

- DONE - Express 4
- DONE - github working
- DONE - check in compiled js!
- DONE - publish to OpenShift
- DONE - make sure OpenShift is SSL
- DONE - redirect to SSL, 
- DONE - see if you can do local SSL!
- split files and do modular thing server
- bower
- browser code
- modular files on client
- mongoDB
- passport authentication
- truecrypt going
- get gulp going for browser reloads?
- share data structures in node and browser
- Facebook React templates going

- use Coinkite API
- testcases for server
- testcases client
- continuous integration
- get promises going with that API

https://help.openshift.com/hc/en-us/articles/202398810-How-to-redirect-traffic-to-HTTPS-


when I start again:
	refactor out some common code
	read typescript daily to get better
	then get the modules going on server



-----------

to get localhost.ssl going

add to etc/hosts localhost.ssl 127.0.0.1.. don't forget sudo

before using OpenSSL set advanced environment variable:
OPENSSL_CONF = 
C:\Program Files (x86)\Git\ssl\openssl.cnf

sudo openssl genrsa -des3 -out server.key 1024
sudo openssl req -new -key server.key -out server.csr
  use localhost.ssl for common name
sudo cp server.key server.key.org
sudo openssl rsa -in server.key.org -out server.key
 sudo openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

run ./start to start server in that mode
click on lock, view cert, Copy to File as localhost.ssl.crt on Desktop... efaults are OK
in Chrome, go to settings, search ssl, manage certifiates...
go to trusted root certs
add localhost.ssl.crt you copied to desktop ... import it, 
import it into trusted roots
 restart browser... but in Chrome you must go to the menu and click Exit for a real restart




git pull openshift master
git merge openshift master -s recursive -X ours
git remote add openshift ssh://54e3a853e0b8cd03d40000c3@sandbox1-dataheads.rhcloud.com/~/git/sandbox1.git/


git push openshift HEAD
rhc tail sandbox1
