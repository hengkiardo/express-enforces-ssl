"use strict";

module.exports = function enforceHTTPS(opts) {

	return function(req, res, next) {

		var isHttps = req.secure;

		if (isHttps) {
			next();
		} else {
			redirectUrl(req, res, opts);
		}
	};

};

var redirectUrl = function (req, res, opts) {
	var port = '';
	if (opts && opts.port) {
		port = ':' + opts.port;
	}
	if (req.method === "GET") {
		res.redirect(301, "https://" + req.hostname + port + req.originalUrl);
	} else {
		res.status(403).send("Please use HTTPS when submitting data to this server.");
	}
};
