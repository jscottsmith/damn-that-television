import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Components
import Project from 'universal/components/templates/Project';

@connect(mapStateToProps)
class ProjectContainer extends Component {
    static propTypes = {
        projects: PropTypes.array.isRequired,
    };

    render() {
        return <Project {...this.props} />;
    }
}

function mapStateToProps(state, props) {
    const projects = state.projects.toArray();
    return {
        projects,
    };
}

export default ProjectContainer;
