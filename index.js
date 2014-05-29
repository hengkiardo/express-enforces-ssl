"use strict";

var enforceHTTPS = function(force_hard) {
	return function(req, res, next) {

		if(force_hard) {
			redirectUrl(req, res);
		}

		var isHttps = req.secure;

		if(isHttps){
			next();
		} else {
			redirectUrl(req);
		}
	}
};

var redirectUrl = function (req, res) {
	if(req.method === "GET") {
		res.redirect(301, "https://" + req.headers.host + req.originalUrl);
	} else {
		res.send(403, "Please use HTTPS when submitting data to this server.");
	}
}

exports.HTTPS = enforceHTTPS;
