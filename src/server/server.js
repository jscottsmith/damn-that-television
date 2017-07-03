import http from 'http';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import 'colors';

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

// commonMiddleware.forEach(ware => {
//     app.use(ware);
// });

// Password Configuration
// passport.use(UserAuthStrategy);
// passport.serializeUser(serializeUser);
// passport.deserializeUser(deserializeUser);

if (PROD) {
    app.use('/static', express.static('build'));
    app.get('*', renderPage);
} else {
    const HMR = require('./hmr.js');
    // Hot Module Reloading
    HMR(app);
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
    app.use(function(err, req, res, next) {
        console.error('error : ', err);
        res.status(err.status || 500);
    });
}

// production error handler
app.use(function(err, req, res, next) {
    console.error('error : ', err.message);
    res.status(err.status || 500);
});

// create the server
const server = http.createServer(app);

const port = process.env.PORT || 3000;
const instance = server.listen(port, () => {
    const address = server.address();
    console.log(
        `${'>>>'.cyan} ${'Listening on:'.rainbow} ${`${address.address}`.magenta}${`${address.port}`.green}`
    );
    process.on('SIGTERM', () => {
        console.log('Received SIGTERM, shutting down'.yellow);

        instance.close(() => {
            console.log('Server stopped successfully'.green);
            process.exit(0);
        });

        setTimeout(() => {
            console.log("Server didn't stop in top, terminating".red);
            process.exit(0);
        }, 9.9 * 1000);
    });
});
