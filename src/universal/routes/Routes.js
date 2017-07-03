// Libraries
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';

// Routes
// For Development only
import * as RouteMap from './static.js';

// This is used in production for code splitting via `wepback.config.server.js`
// import * as RouteMap from 'universal/routes/async.js';

// Containers
import AppContainer from 'universal/containers/App/AppContainer.js';
// import PrivateRouteContainer from 'universal/containers/PrivateRoute/PrivateRouteContainer.js';

class Routes extends Component {
    render() {
        const { location } = this.props;
        return (
            <AppContainer location={location}>
                <div>
                    <Route
                        exact
                        location={location}
                        path="/"
                        render={props => <RouteMap.Home {...this.props} />}
                    />
                    <Route
                        exact
                        location={location}
                        path="/projects"
                        render={props => (
                            <RouteMap.ProjectsContainer {...this.props} />
                        )}
                    />
                    <Route
                        location={location}
                        path="/projects/:slug"
                        render={({ match }) => {
                            return (
                                <RouteMap.ProjectContainer
                                    slug={match.params.slug}
                                />
                            );
                        }}
                    />
                    <Route
                        exact
                        location={location}
                        path="/counter"
                        render={props => (
                            <RouteMap.CounterContainer {...this.props} />
                        )}
                    />
                </div>
            </AppContainer>
        );
    }
}

export default Routes;
