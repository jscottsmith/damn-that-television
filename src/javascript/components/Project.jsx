import React, { PropTypes } from 'react';
import _ from 'lodash';

class Project extends React.Component {

    static propTypes = {
        routeParams: PropTypes.object.isRequired,
        projects: PropTypes.array,
    };

    constructor(props) {
        super(props);
        this.project = this.getProject();
    }

    getProject() {
        const { slug } = this.props.routeParams;
        const project = _.find(this.props.projects, slug);
        return project;
    }

    render() {
        return (
            <div>
                <p>Projects/</p>
                <h4>{this.project.title}</h4>
            </div>
        );
    }
}

export default Project;
