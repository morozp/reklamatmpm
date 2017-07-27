const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const api = require('./routes/api');


const app = express();
const DIST_DIR = path.join(__dirname, "dist"),
    CONTENT_DIR = path.join(__dirname, "content"),
    HTML_FILE = path.join(DIST_DIR, "index.html"),
    isDevelopment = process.env.NODE_ENV !== "production",
    DEFAULT_PORT = 5000 ;

// init data bases
require('./db/db-init'); 
require('./db/db-file-storage-init'); 

console.log(process.env.NODE_ENV );
app.set('port', (process.env.PORT || DEFAULT_PORT));
if (isDevelopment) {
    const config = require('../webpack.dev.config');
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
    app.use(express.static(DIST_DIR));
}

app.use(cookieParser())
app.use(session({
    secret: 'winner',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: require('mongoose').connection })
}));
app.use(express.static(CONTENT_DIR));

// -- views engine --
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
// -- end views engine --

app.use(logger('dev'));
app.use(bodyParser());
app.use(api);


// Routing
app.get('*', (req, res) => {
    res.render('index', { name: 'reklama.tm' });
});
app.use(require('./routes/error-handler'));
app.listen(app.get('port'), '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', app.get('port'), app.get('port'));
});
