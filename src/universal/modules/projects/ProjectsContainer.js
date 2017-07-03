import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Components
import Projects from 'universal/components/pages/Projects';

@connect(mapStateToProps)
class ProjectsContainer extends Component {
    static propTypes = {
        projects: PropTypes.array.isRequired,
    };

    render() {
        return <Projects {...this.props} />;
    }
}

function mapStateToProps(state, props) {
    const projects = state.projects.toArray();
    return {
        projects,
    };
}

export default ProjectsContainer;
