import React from 'react';
import { render } from 'react-dom';
import { AppContainer as HotContainer } from 'react-hot-loader';

// Components
import AppContainer from './containers/AppContainer.js';

// Redux
import { Provider } from 'react-redux';
import createStore from '../universal/redux/createStore.js';
import createHistory from 'history/createBrowserHistory';

// Gsap
import '../universal/libs/gsap';

const history = createHistory();
const store = createStore(history);

const rootEl = document.getElementById('root');

// takes the latest AppContainer and renders via Hot
const renderApp = LatestContainer => {
    render(
        <HotContainer>
            <Provider store={store}>
                <LatestContainer />
            </Provider>
        </HotContainer>,
        rootEl
    );
};

renderApp(AppContainer);

if (module.hot) {
    console.log('Changed!');
    module.hot.accept('./containers/AppContainer.js', () => {
        const NextAppContainer = require('./containers/AppContainer.js');
        renderApp(NextAppContainer);
    });
}
