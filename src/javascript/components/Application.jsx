import React, { PropTypes } from 'react';
import ReactTransitionGroup from 'react/lib/ReactTransitionGroup';
import Navigation from './Navigation';
import Transition from './Transition';
import { connectToStores } from 'fluxible-addons-react';

class Application extends React.Component {

    static propTypes = {
        appState: PropTypes.object.isRequired,
        projects: PropTypes.object.isRequired,
        children: PropTypes.node.isRequired,
    };

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    render() {
        const key = this.props.location.pathname;

        return (
            <div>
                <Navigation />
                <ReactTransitionGroup component="main">
                    <Transition key={key}>
                        {React.cloneElement(this.props.children, {
                            appState: this.props.appState,
                            projects: this.props.projects,
                        })}
                    </Transition>
                </ReactTransitionGroup>
            </div>
        );
    }
}

Application = connectToStores(Application, ['ApplicationStore', 'ProjectsStore'], (context) => ({
    appState: context.getStore('ApplicationStore').getState(),
    projects: context.getStore('ProjectsStore').getState(),
}));

export default Application;
