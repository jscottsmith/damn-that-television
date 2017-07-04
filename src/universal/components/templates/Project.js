import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Hero from '../organisms/Hero';
import Intro from '../organisms/Intro';

class Project extends PureComponent {
    static propTypes = {
        slug: PropTypes.string.isRequired,
        projects: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            project: this.getProject(),
        };
    }

    getProject() {
        const slug = this.props.slug;
        const project = _.find(this.props.projects, { slug });
        return project;
    }

    render() {
        const { project } = this.state;

        const { colors, title, description, url } = project;

        const style = {
            backgroundColor: colors.primary,
        };

        return (
            <article className="page-project-detail">
                <Hero title={title} color={colors.primary} />
                <Intro description={description} />
                <section className="link" style={style}>
                    <a href={url} target="_blank">GO</a>
                </section>
            </article>
        );
    }
}

export default Project;