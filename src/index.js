const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const webpack = require('webpack');

const webpackDevMiddleware = require( 'webpack-dev-middleware');  
const webpackHotMiddleware = require('webpack-hot-middleware');  
const config  = require('./webpack.dev.config.js');

const api = require('./routes/api');
const ads = require('./routes/ads');

const app = express();
const DIST_DIR      = path.join(__dirname, "dist"),
      HTML_FILE     = path.join(DIST_DIR, "index.html"),
      isDevelopment = process.env.NODE_ENV !== "production",
      DEFAULT_PORT  = 5000,
      compiler      = webpack(config);
// Set
app.set('port', (process.env.PORT || DEFAULT_PORT));
if(isDevelopment){		  
    console.log('development');

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler));

    /*app.get("*", (req, res, next) => {
        compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
            if (err) {
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });
    });*/
}
else{
	app.use(express.static(DIST_DIR));

    app.get("*", (req, res) => res.sendFile(HTML_FILE));
}

// -- views engine --
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
// -- end views engine --

app.use(logger('dev'));
app.use(bodyParser());



/*app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	//log.error('Internal error(%d): %s', res.statusCode, err.message);
	res.send({ error: err.message });
	return;
});

app.get('/ErrorExample', function (req, res, next) {
	next(new Error('Random error!'));
});*/


// Routing
app.get('/', (req, res) => {
	res.render('index', { name: 'Maxim' });
});

app.use('/api', api);
app.use('/ads', ads);

app.listen(app.get('port'), function () {
	console.log('Express server start');
	console.log(`Express server listening on port ${app.get('port')}`);
	console.log('...');
});