const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static')

const api = require('./routes/api');


const app = express();
// Set
app.set('port', (process.env.PORT || 5000));
// -- views engine --
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
// -- end views engine --

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
app.get('/', (req, res) => {
	res.render('index', { name: 'Maxim' });
});

app.get('/test', (req, res) => {
	res.send('Hello World, I`m reklamatm pm this url `test`');
})

app.use('/api', api);

app.listen(app.get('port'), function () {
	console.log('Express server start');
	console.log(`Express server listening on port ${app.get('port')}`);
	console.log('...');
});