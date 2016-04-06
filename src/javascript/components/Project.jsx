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
        return (
            <article className="page-project-detail">
                <section className="intro">
                    <p>Projects /</p>
                    <h4>{this.state.project.title}</h4>
                    <p>{this.state.project.description}</p>
                </section>
                <section className="link">
                    <a href={this.state.project.url} target="_blank" >GO</a>
                </section>
            </article>
        );
    }
}

export default Project;
