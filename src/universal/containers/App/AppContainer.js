import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Main from 'universal/components/organisms/Main';

// Currently unused because is it was confusing
// and not providing an additional functionality
// Now using Main directly in Routes

class AppContainer extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    };

    render() {
        return <Main {...this.props} />;
    }
}

export default AppContainer;
