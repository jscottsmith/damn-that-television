import React, { PropTypes } from 'react';
import _ from 'lodash';

class Project extends React.Component {

    static propTypes = {
        routeParams: PropTypes.object.isRequired,
        projects: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = {
            project: this.getProject(),
        };
    }

    getProject() {
        const slug = this.props.routeParams.slug;
        const project = _.find(this.props.projects, { slug });
        return project;
    }

    render() {
        const { project } = this.state;
        const style = {
            backgroundColor: project.colors.primary,
        };
        return (
            <article className="page-project-detail">
                <section className="intro">
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
                </section>
                <section className="link" style={style}>
                    <a href={project.url} target="_blank" >GO</a>
                </section>
            </article>
        );
    }
}

export default Project;
