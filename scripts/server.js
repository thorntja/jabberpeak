'use strict';

const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');

var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://thorntja:jake2u@ds050189.mlab.com:50189/testing');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var auth = require('./routes/auth');
var api = require('./routes/api');

app.set( 'port', process.env.PORT || 3000 );

app.use( express.static(
	path.join(__dirname, '../', 'public'),
	{
		index: false, // don't look for index.html files in sub directories.
		extensions:['html']
	})
);

app.use('/api', api);
app.use('/auth', auth);

app.get('/test', (req, res) => {
	res.sendFile( path.join(__dirname, '../', 'public', 'splash.html') );
})

// for every request made, if the file doesn't exist, return index.html file.
app.get( '/*', (req, res) => {
	res.sendFile( path.join(__dirname, '../', 'public', 'index.html') );
});

app.listen( app.get('port'), function () {
	console.log('Server running at http://localhost:%s', app.get('port'));
});
