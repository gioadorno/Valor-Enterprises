import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import App from './App';
import { InternalProvider } from './context/InternalContext';
import { Account } from './Components/Login/Account';
// import thunk from 'redux-thunk';
// import reducers from './reducers/index'
// import { applyMiddleware, createStore, compose } from 'redux';

// const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <InternalProvider>
            <App />
    </InternalProvider>
    ,document.getElementById('root'));