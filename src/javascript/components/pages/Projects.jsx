import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

export default class Projects extends React.Component {
    static propTypes = {
        projects: PropTypes.object,
    };

    render() {
        const { projects } = this.props;
        return (
            <article className="page-projects">
                <Helmet title="Projects" />
                <h2>Projects/</h2>
                <ul className="project-listing">
                    {Object.keys(projects).map((objKey) => {
                        const project = projects[objKey];
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
