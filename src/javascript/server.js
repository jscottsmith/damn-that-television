import path from 'path';
import d from 'debug';
import express from 'express';
import expressState from 'express-state';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { provideContext } from 'fluxible-addons-react';
import app from 'app/app';
import Html from 'components/Html.jsx';
import csrf from 'csurf';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Helmet from 'react-helmet';
import _last from 'lodash/last';

// Routing
import { RouterContext, match } from 'react-router';
import routes from 'components/Routes';
import { createMemoryHistory } from 'react-router';

const debug = d('Server');

module.exports = function(devServer = () => {}) {
    const server = express();

    expressState.extend(server);

    devServer(server);

    server.use(compression());
    server.use('/', express.static(path.resolve('./build/client')));
    server.use(cookieParser());
    server.use(bodyParser.json());
    server.use(csrf({
        cookie: true,
    }));

    // Trailing Slash, 301 Redirect
    server.use((req, res, next) => {
        if (req.path.substr(-1) === '/' && req.path.length > 1) {
            const query = req.url.slice(req.path.length);
            res.redirect(301, req.path.slice(0, -1) + query);
        } else {
            next();
        }
    });

    // Cache times
    server.use(function setCacheTimes(req, res, next) {
        const appCacheTime = process.env.APP_CACHE_TIME || 501;

        res.setHeader('Cache-Control', `public, max-age=${appCacheTime}`);
        return next();
    });

    server.use((req, res) => {
        const location = createMemoryHistory().createLocation(req.url);
        const context = app.createContext({
            req,
            env: process.env.NODE_ENV || 'local',
            siteUrl: process.env.SITE_URL || `${req.protocol}://${process.env.VIRTUAL_HOST}` || `${req.protocol}://${req.hostname}`,
            staticAssetsBase: process.env.STATIC_ASSETS_BASE ? process.env.STATIC_ASSETS_BASE : '',
            aws: {
                useS3: process.env.USE_S3 && process.env.USE_S3 !== 'false' || false,
                bucket: process.env.S3_BUCKET || 'madeinhaus',
                prefix: process.env.S3_PREFIX || '',
                folder: process.env.S3_PATH || process.env.NODE_ENV || '',
                urlHash: process.env.URL_HASH || '',
                cloudfront: process.env.CLOUDFRONT_URL || '',
                bypassCdn: req.query.bypass || false,
            },
            xhrContext: {
                _csrf: req.csrfToken(), // Make sure all XHR requests have the CSRF token
            },
        });

        match({ routes, location }, (error, redirectLocation, renderProps) => {
            if (redirectLocation) {
                res.redirect(301, redirectLocation.pathname + redirectLocation.search);
            } else if (error) {
                res.status(500).send(error.message);
            } else {
                if (_last(renderProps.routes).isNotFound) {
                    res.status(404);
                }

                const appState = app.dehydrate(context);
                appState.env = process.env.NODE_ENV || 'local';
                res.expose(appState, 'App');

                const props = Object.assign(
                    {},
                    renderProps,
                    { context: context.getComponentContext() }
                );

                const RouterComponent = provideContext(RouterContext, app.customContexts);
                const HtmlComponent = provideContext(Html, app.customContexts);

                const head = Helmet.rewind();

                const markup = ReactDOMServer.renderToString(
                    React.createElement(RouterComponent, props)
                );

                const html = ReactDOMServer.renderToStaticMarkup(
                    React.createElement(HtmlComponent, {
                        title: 'react-flux-gulp-starter - madeinhaus.com',
                        context: context.getComponentContext(),
                        state: res.locals.state,
                        markup,
                        location,
                        head,
                    }
                ));

                res.send(`<!DOCTYPE html>${html}`);
            }
        });
    });

    const port = process.env.PORT || 3000;
    const instance = server.listen(port, () => {
        debug(`Listening on port ${port}`);

        process.on('SIGTERM', () => {
            debug('Received SIGTERM, shutting down');

            instance.close(() => {
                debug('Server stopped successfully');
                process.exit(0);
            });

            setTimeout(() => {
                debug('Server didn\'t stop in top, terminating');
                process.exit(0);
            }, 9.9 * 1000);
        });
    });

};
