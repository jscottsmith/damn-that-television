import React, { PropTypes } from 'react';
import Navigation from 'components/Navigation';
import { connectToStores } from 'fluxible-addons-react';

class Application extends React.Component {

    static propTypes = {
        appState: PropTypes.object.isRequired,
        projects: PropTypes.object.isRequired,
        children: PropTypes.node.isRequired,
    };

    render() {
        return (
            <div>
                <Navigation />
                <main>
                    {React.cloneElement(this.props.children, {
                        appState: this.props.appState,
                        projects: this.props.projects,
                    })}
                </main>
            </div>
        );
    }
}

Application = connectToStores(Application, ['ApplicationStore', 'ProjectsStore'], (context) => ({
    appState: context.getStore('ApplicationStore').getState(),
    projects: context.getStore('ProjectsStore').getState(),
}));

export default Application;
