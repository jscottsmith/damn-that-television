import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
// import RouteTransition from '../molecules/RouteTransition';
// import Navigation from '../organisms/Navigation';
import { renderRoutes } from 'react-router-config';

// Global styles imported on dev only
// Html on server gets extracted text stylesheet in production
const PROD = process.env.NODE_ENV === 'production';
if (!PROD) require('Styles/styles.scss');

class Main extends Component {
    static propTypes = {
        route: PropTypes.object.isRequired,
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
        const { location, route } = this.props;

        return <main>{renderRoutes(route.routes)}</main>;
    }
}

export default Main;
