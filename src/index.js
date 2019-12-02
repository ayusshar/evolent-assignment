import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Main } from './components/main';
import thunk from 'redux-thunk';
import reducers from './reducers';
import './styles/index.css';

const store = createStore(reducers, {contacts: []}, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
));

const App = () => {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}

render(<App />, document.getElementById('root'));
