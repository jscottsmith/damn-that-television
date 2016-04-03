import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class Home extends React.Component {
    static propTypes = {
        projects: PropTypes.array,
    };

    render() {
        const { projects } = this.props;
        return (
            <article>
                <h1>Projects/</h1>
                <ul>
                    {projects.map((project) => {
                        const url = `/projects/${project.slug}`;
                        const title = project.title;
                        const key = project.slug;

                        return <li key={key}><Link to={url}>{title}</Link></li>;
                    })}
                </ul>
            </article>
        );
    }
}
