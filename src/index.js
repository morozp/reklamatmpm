const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');

const api = require('./routes/api');
const ads = require('./routes/ads');

const app = express();
const DIST_DIR = path.join(__dirname, "dist"),
    HTML_FILE = path.join(DIST_DIR, "index.html"),
    isDevelopment = process.env.NODE_ENV !== "production",
    DEFAULT_PORT = 5000 ;
// Set
console.log(process.env.NODE_ENV );
app.set('port', (process.env.PORT || DEFAULT_PORT));
if (isDevelopment) {
    const config = require('./webpack.dev.config.js');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const compiler = webpack(config);
    console.log('development');

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler));
}
else {
    console.log('production');
    app.use(express.static(DIST_DIR));
}

// -- views engine --
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
// -- end views engine --

app.use(logger('dev'));
app.use(bodyParser());

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    //log.error('Internal error(%d): %s', res.statusCode, err.message);
    res.send({ error: err.message });
    return;
});

app.get('/ErrorExample', function (req, res, next) {
    next(new Error('Random error!'));
});


// Routing
app.get('/', (req, res) => {
    res.render('index', { name: 'Maxim' });
});

app.use('/api', api);
app.use('/ads', ads);



app.listen(app.get('port'), '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://localhpst:%s/ in your browser.', app.get('port'), app.get('port'));
});
