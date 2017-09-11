// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';
// import Routes from 'Universal/routes/Routes';
// Redux
import { Provider } from 'react-redux';

class Html extends Component {
    static propTypes = {
        assets: PropTypes.object,
        context: PropTypes.object.isRequired,
        store: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    };

    render() {
        const PROD = process.env.NODE_ENV === 'production';
        const { title, store, assets, url, context } = this.props;
        const { manifest, app, vendor } = assets || {};
        const state = store.getState();
        const initialState = `window.__INITIAL_STATE__ = ${JSON.stringify(
            state
        )}`;

        const Routes = PROD ? require('../../build/routes.js') : () => {};

        const root =
            PROD &&
            renderToString(
                <Provider store={store}>
                    <StaticRouter location={url} context={context}>
                        <Routes location={url} />
                    </StaticRouter>
                </Provider>
            );

        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
                    />
                    <title>{title}</title>
                    <script src="https://use.typekit.net/bwo5nqc.js" />
                    <script
                        dangerouslySetInnerHTML={{
                            __html:
                                'try{Typekit.load({ async: true });}catch(e){}',
                        }}
                    />
                    {PROD && (
                        <link
                            rel="stylesheet"
                            href="/static/styles.css"
                            type="text/css"
                        />
                    )}
                </head>
                <body>
                    {PROD ? (
                        <div
                            id="root"
                            dangerouslySetInnerHTML={{ __html: root }}
                        />
                    ) : (
                        <div id="root" />
                    )}
                    <script
                        dangerouslySetInnerHTML={{ __html: initialState }}
                    />
                    {PROD && (
                        <script
                            dangerouslySetInnerHTML={{ __html: manifest.text }}
                        />
                    )}
                    {PROD && <script src={vendor.js} />}
                    <script src={PROD ? app.js : '/static/app.js'} />
                </body>
            </html>
        );
    }
}

export default Html;
