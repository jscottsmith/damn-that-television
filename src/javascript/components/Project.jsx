import React, { PropTypes } from 'react';
import _ from 'lodash';

class Project extends React.Component {

    static propTypes = {
        routeParams: PropTypes.object.isRequired,
        projects: PropTypes.array,
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
            <div>
                <p>Projects/</p>
                <h4>{this.state.project.title}</h4>
                <p>{this.state.project.description}</p>
            </div>
        );
    }
}

export default Project;
