import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'Universal/routes/Routes.js';

class AppContainer extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        );
    }
}

export default AppContainer;
