const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static')

const api = require('./routes/api');


const app = express();
// Set
app.use(logger('dev'));
app.use(bodyParser());
app.use(serveStatic(path.join(__dirname, 'static')));

/*app.use(function (req, res, next) {
	res.status(404);
	//logger. .debug('Not found URL: %s', req.url);
	res.send({ error: 'Not found' });
	return;
});

app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	//log.error('Internal error(%d): %s', res.statusCode, err.message);
	res.send({ error: err.message });
	return;
});

app.get('/ErrorExample', function (req, res, next) {
	next(new Error('Random error!'));
});

*/
// Routing
app.get('/', (req, resp) => {
	resp.send('Hello World, I`m reklamatm pm');
});

app.get('/test', (req, resp) => {
	resp.send('Hello World, I`m reklamatm pm this url `test`');
})

app.use('/api', api);

app.listen(5000, function () {
	console.log('Express server start');
	console.log('Express server listening on port 5000');
	console.log('...');
});