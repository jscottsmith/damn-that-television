import React, { PropTypes, PureComponent } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

export default class Projects extends PureComponent {
    static propTypes = {
        projects: PropTypes.array.isRequired,
    };

    render() {
        const { projects } = this.props;

        return (
            <article className="page-projects">
                <Helmet title="Projects" />
                <h2>Projects/</h2>
                <ul className="project-listing">
                    {projects.map(project => {
                        const url = `/projects/${project.slug}`;
                        const title = project.title;
                        const key = project.slug;

                        return <li key={key}><Link to={url} className="big-link">{title}</Link></li>;
                    })}
                </ul>
            </article>
        );
    }
}
