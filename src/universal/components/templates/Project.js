import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Hero from '../organisms/Hero';
import Intro from '../organisms/Intro';
import waitForIt from '../../hoc/waitForIt';

class Project extends PureComponent {
    static propTypes = {
        project: PropTypes.object.isRequired,
    };

    render() {
        const { project } = this.props;

        const { color_primary, title, description, site_url } = project;

        const style = {
            backgroundColor: color_primary,
        };

        return (
            <article className="page-project-detail">
                <Hero title={title} color={color_primary} />
                <Intro description={description} />
                <section className="link" style={style}>
                    <a href={site_url} target="_blank">GO</a>
                </section>
            </article>
        );
    }
}

export default waitForIt(Project, 'project');

