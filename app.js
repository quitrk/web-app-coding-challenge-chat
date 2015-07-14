/* jshint node: true */

var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public/app'));
app.use(express.static(__dirname + '/public/'));
app.listen(process.env.HTTP_PORT || 1337, function(err) {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log('Listening for incoming requests!');
});