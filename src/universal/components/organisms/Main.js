import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import RouteTransition from '../molecules/RouteTransition';
import Navigation from '../organisms/Navigation';

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
        const { children, location } = this.props;

        return (
            <main>
                <Navigation />
                <RouteTransition location={location}>
                    {children}
                </RouteTransition>
            </main>
        );
    }
}

export default Main;
