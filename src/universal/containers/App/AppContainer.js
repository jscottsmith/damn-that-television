import React, { Component, PropTypes } from 'react';
import Main from 'universal/components/organisms/Main';

class AppContainer extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
    };

    render() {
        return <Main {...this.props} />;
    }
}

export default AppContainer;
