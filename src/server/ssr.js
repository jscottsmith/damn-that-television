// Node Modules
import fs from 'fs';
import { basename, join } from 'path';

// Libraries
import React from 'react';
import { renderToString } from 'react-dom/server';

// Redux
import createStore from 'universal/redux/createStore.js';
import createHistory from 'history/createMemoryHistory';

// Components
import Html from './Html.js';

// routing
import { matchRoutes } from 'react-router-config';
import { routes } from 'Universal/routes/static.js';

function renderApp(req, res, store, assets) {
    const context = {};
    const { url } = req;

    // fetch route data and server side render

    // get the route branch by matching the url from the routes config
    const branch = matchRoutes(routes, req.url);

    // create promise from routes with fetchData functions
    const promises = branch.map(({ route }) => {
        const fetchData = route.component.fetchData;
        const hasFetch = fetchData instanceof Function;
        const promise = hasFetch ? fetchData(store) : Promise.resolve(null);
        return promise;
    });

    return Promise.all(promises)
        .then(() => {
            const html = renderToString(
                <Html
                    title="💥"
                    store={store}
                    url={url}
                    context={context}
                    assets={assets}
                />
            );

            res.send('<!DOCTYPE html>' + html);
        })
        .catch(err => {
            throw new Error(err);
        });
}

export const renderPage = function(req, res) {
    const history = createHistory();
    const store = createStore(history);
    const assets = require('../../build/assets.json');

    assets.manifest.text = fs.readFileSync(
        join(__dirname, '..', '..', 'build', basename(assets.manifest.js)),
        'utf-8'
    );
    renderApp(req, res, store, assets);
};

export default renderPage;
