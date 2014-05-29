express-enforces-ssl
==============

This simple module enforces HTTPS connections on any incoming requests. In case of a non-encrypted HTTP request, express-enforces-ssl automatically redirects to an HTTPS address using a 301 permanent redirect.

express-enforces-ssl also works behind reverse proxies (load balancers) as they are for example used by Heroku and nodejitsu. In such cases, however, the `trustProxy` parameter has to be set (see below)

### Usage

First, install the module:

```
$ npm install express-enforces-ssl --save
```

Afterwards, require the module and *use* the `HTTPS()` method:
```javascript
var express = require('express');
var http = require('http');
var express_enforces_ssl = require('express-enforces-ssl');

var app = express();

app.enable('trust proxy');

app.use(express_enforces_ssl());

/*
    Routes Here
*/

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

```

LICENCE

MIT
