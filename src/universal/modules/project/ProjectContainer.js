import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import Project from 'Universal/components/templates/Project';

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
    const projects = state.project.toArray();
    return {
        projects,
    };
}

export default ProjectContainer;
