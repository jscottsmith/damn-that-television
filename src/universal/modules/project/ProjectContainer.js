import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';
import { fetchProjects } from '../projects/projects';

// Components
import Project from 'Universal/components/templates/Project';

// this uses the same fetch as projects
// insteads of fetching an individual
// API is setup to return individual
// projects but it doesn't seem necessary yet.

@connect(mapStateToProps, mapDispatchToProps)
class ProjectContainer extends Component {
    static fetchData(store) {
        return store.dispatch(fetchProjects());
    }

    static propTypes = {
        project: PropTypes.object.isRequired,
        fetchProjects: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.fetchProjects();
    }

    render() {
        return <Project {...this.props} />;
    }
}

function mapStateToProps(state, props) {
    const projects = state.projects.toArray();
    const { slug } = props.match.params;
    const project = find(projects, { slug });

    return {
        project,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProjects }, dispatch);
}

export default ProjectContainer;
