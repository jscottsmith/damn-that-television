import http from 'http';
import express from 'express';
// import path from 'path';
import bodyParser from 'body-parser';
import compression from 'compression';
import apiRoutes from './routes';
import 'colors';
import logger from './logger.js';

logger();

// // Redux Dev Tools server
// var remotedev = require('remotedev-server');
// remotedev({ hostname: 'localhost', port: 8000 });

// Security
// import passport from 'passport';
// import bcrypt   from 'bcrypt';
// import session from './session.js';

// Server Side Rendering
import { renderPage, renderDevPage } from './ssr.js';

const PROD = process.env.NODE_ENV === 'production';

const app = express();

// Middlewares
// const commonMiddleware = [
//     session,
//     passport.initialize(),
//     passport.session()
// ];

app.use(bodyParser.json());
app.use(compression());

// commonMiddleware.forEach(ware => {
//     app.use(ware);
// });

// Password Configuration
// passport.use(UserAuthStrategy);
// passport.serializeUser(serializeUser);
// passport.deserializeUser(deserializeUser);

if (PROD) {
    app.use('/static', express.static('build'));

    apiRoutes(app);
    app.get('*', renderPage);
} else {
    // Hot Module Reloading
    const HMR = require('./hmr.js');
    HMR(app);

    apiRoutes(app);
    app.get('*', renderDevPage);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
if (!PROD) {
    app.use((err, req, res, next) => {
        console.error('error : ', err);
        res.status(err.status || 500);
    });
}

// production error handler
app.use((err, req, res, next) => {
    console.error('error : ', err.message);
    res.status(err.status || 500);
});

// create the server
const server = http.createServer(app);

const port = process.env.PORT || 3000;

const instance = server.listen(port, () => {
    const address = server.address();
    log(
        `${'Listening on:'.rainbow} ${`${process.env.DOMAIN_NAME}`.cyan}:${`${address.port}`.cyan}`
    );
});
