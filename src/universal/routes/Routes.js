// Libraries
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router';

// Routes
// For Development only
import * as RouteMap from './static.js';

// This is used in production for code splitting via `wepback.config.server.js`
// import * as RouteMap from 'universal/routes/async.js';

// Containers
import Main from 'universal/components/organisms/Main';
// import PrivateRouteContainer from 'universal/containers/PrivateRoute/PrivateRouteContainer.js';

class Routes extends Component {
    render() {
        const { location } = this.props;
        return (
            <Main location={location}>
                <Switch>
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
                    <Route
                        location={location}
                        render={({ staticContext }) => {
                            if (staticContext) {
                                staticContext.status = 404;
                            }
                            return <RouteMap.NotFound />;
                        }}
                    />
                </Switch>
            </Main>
        );
    }
}

export default Routes;
