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

var redirectUrl = function (req, res, opts = {
	message: "Please use HTTPS when submitting data to this server.",
	port: "",
}) {
	if (req.method === "GET") {
		res.redirect(301, `https://${req.headers.host}${req.port}${req.originalUrl}`);
	} else {
		res.status(403).send(opts.message);
	}
};
