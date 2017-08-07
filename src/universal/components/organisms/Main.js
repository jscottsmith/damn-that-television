import React, { Component, PropTypes } from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import Helmet from 'react-helmet';

import Navigation from '../organisms/Navigation';
import Transition from '../molecules/Transition';

// Global styles
import '../../../sass/styles.scss';

class Main extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        location: PropTypes.object.isRequired,
    };

    getHelmet() {
        const pageDescription = 'Work by J Scott Smith';
        const pageThumb = '/images/haus-friend.png';

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
                    {
                        property: 'og:url',
                        content: this.props.location.pathname,
                    },
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
            <main>
                <Navigation />
                <ReactTransitionGroup component="div">
                    <Transition key={key}>
                        {this.props.children}
                    </Transition>
                </ReactTransitionGroup>
            </main>
        );
    }
}

export default Main;
