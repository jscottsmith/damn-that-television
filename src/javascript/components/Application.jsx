import React, { PropTypes, PureComponent } from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import Helmet from 'react-helmet';
import Navigation from './Navigation';
import Transition from './Transition';
import { connectToStores } from 'fluxible-addons-react';

import 'sass/styles';

class Application extends PureComponent {

    static propTypes = {
        appState: PropTypes.object.isRequired,
        children: PropTypes.node.isRequired,
        location: PropTypes.object.isRequired,
        projects: PropTypes.array.isRequired,
    };

    static contextTypes = {
        router: PropTypes.object.isRequired,
        siteUrl: PropTypes.func.isRequired,
        assetUrl: PropTypes.func.isRequired,
    };

    getHelmet() {
        const pageDescription = 'Work by J Scott Smith';
        const pageThumb = this.context.assetUrl('/images/haus-friend.png');

        return (
            <Helmet
                titleTemplate="%s | J"
                defaultTitle="Damn That Television"
                meta={[
                    { name: 'description', content: pageDescription },
                    // Twitter Meta
                    { name: 'twitter:card', content: 'summary_large_image' },
                    { name: 'twitter:site', content: '@spacebang' },
                    { name: 'twitter:creator', content: '@spacebang' },
                    { name: 'twitter:description', content: pageDescription },
                    { name: 'twitter:image', content: pageThumb },
                    // Facebook OG
                    { property: 'og:url', content: this.context.siteUrl() + this.props.location.pathname },
                    { property: 'og:description', content: pageDescription },
                    { property: 'og:image', content: pageThumb },
                    { property: 'og:type', content: 'website' },
                ]}
            />
        );
    }

    render() {
        const key = this.props.location.pathname;

        return (
            <div>
                {this.getHelmet()}
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
