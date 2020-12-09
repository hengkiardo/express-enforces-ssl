"use strict";

module.exports = function enforceHTTPS(opts = {}) {
	if (opts.port && opts.port !== 80) {
		opts.redirectStatus = opts.redirectStatus || 307
	}

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
	redirectStatus: 301,
	rejectStatus: 403,
	message: "Please use HTTPS when submitting data to this server.",
}) {
	if (req.method === "GET") {
		res.redirect(opts.redirectStatus, `https://${req.hostname}${opts.port ? `:${opts.port}` : '' }${req.originalUrl}`);
	} else {
		res.status(opts.rejectStatus).send(opts.message);
	}
};
