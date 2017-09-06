import React from 'react';
// import PropTypes from 'prop-types';
// import { Route, Switch } from 'react-router';
import { routes } from './static.js';
import { renderRoutes } from 'react-router-config';

// NOTE: This is rendered on the server then the client.
//
// On the server a prerendered wepacked version of Routes
// is required on Prod and rendered via the server/Html.js
//
// On the client this is rendered in the client/AppContainer

const Routes = () => renderRoutes(routes);

export default Routes;
