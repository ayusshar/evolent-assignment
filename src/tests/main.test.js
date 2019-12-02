import React from 'react';
import { render } from 'react-dom';
import { Main } from '../components/main';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const store = createStore(reducers, { contacts: [] }, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
));


describe('render', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        render(<Provider store={store}>
            <Main />
        </Provider>, div);
    })
});