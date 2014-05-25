"use strict";

var enforceHTTPS = function() {
	return function(req, res, next) {

		// First, check if directly requested via https
		var isHttps = req.secure;

		if(!isHttps) {
			var isHttps = (req.headers['x-forwarded-proto'] == 'https');
		}

		if(isHttps){
			// Only redirect GET methods
			if(req.method === "GET") {
				res.redirect(301, "https://" + req.headers.host + req.originalUrl);
			} else {
				res.send(403, "Please use HTTPS when submitting data to this server.");
			}
		} else {
			next();
		}
	}
};

exports.HTTPS = enforceHTTPS;
