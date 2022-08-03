import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './App';
import thunk from 'redux-thunk';
import reducers from './reducers/index'
import { applyMiddleware, createStore, compose } from 'redux';

const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));