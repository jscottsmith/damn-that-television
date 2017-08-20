import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchProjects } from './projects';

// Components
import Projects from 'Universal/components/pages/Projects';

@connect(mapStateToProps, mapDispatchToProps)
class ProjectsContainer extends Component {
    static fetchData(store) {
        return store.dispatch(fetchProjects());
    }

    static propTypes = {
        fetchProjects: PropTypes.func.isRequired,
        projects: PropTypes.array.isRequired,
    };

    componentDidMount() {
        this.props.fetchProjects();
    }

    render() {
        return <Projects {...this.props} />;
    }
}

function mapStateToProps(state, props) {
    // this will be unnecessary with SSR fetching but for
    // now i'm gaurding against not have an immutable array.
    const projects = state.projects.toArray();
    return {
        projects,
    };
}
// Why doesn't this work. Am I stupid? Probably.
// const mapStateToProps = (state, props) => ({
//     projects: state.projects.toArray(),
// });

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProjects }, dispatch);
}
// Why doesn't this work. Am I stupid? Probably.
// const mapDispatchToProps = dispatch =>
//     bindActionCreators({ fetchProjects }, dispatch);

export default ProjectsContainer;
