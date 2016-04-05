import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class Projects extends React.Component {
    static propTypes = {
        projects: PropTypes.array,
    };

    render() {
        const { projects } = this.props;
        return (
            <article className="page-projects">
                <h2>Projects/</h2>
                <ul className="project-listing">
                    {projects.map((project) => {
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
