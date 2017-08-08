import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';

// Routes
// For Development only
import * as RouteMap from './static.js';

// This is used in production for code splitting via `wepback.config.server.js`
// import * as RouteMap from 'universal/routes/async.js';

// Containers
import Main from 'universal/components/organisms/Main';
// import PrivateRouteContainer from 'universal/containers/PrivateRoute/PrivateRouteContainer.js';

class Routes extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
    };

    render() {
        const { location } = this.props;

        // NOTE: At some point in the near future I will ask myself why i did this.
        // Well, in order for SSR to properly render the right route and NOT a 404
        // the Switch  must NOT be passed the location prop. However on the client
        // the Switch DOES need this prop for Transition. So know you remember.
        // Is there a better way? Most likely but I don't know what way that is yet.
        const props = {};
        if (typeof window !== 'undefined') {
            props.location = location;
        }

        return (
            <Main location={location}>
                <Switch {...props}>
                    <Route
                        exact
                        path="/"
                        render={props => <RouteMap.Home {...this.props} />}
                    />
                    <Route
                        exact
                        path="/projects"
                        render={props => (
                            <RouteMap.ProjectsContainer {...this.props} />
                        )}
                    />
                    <Route
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
                        path="/counter"
                        render={props => (
                            <RouteMap.CounterContainer {...this.props} />
                        )}
                    />
                    <Route
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
