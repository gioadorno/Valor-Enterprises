import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import GuestLogin from './GuestLogin'
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import reducers from '../../../reducers';

const store = createStore(reducers, compose(applyMiddleware(thunk)))

test('When page is rendered, button is disabled',() => {

    render(<Provider store={store}><GuestLogin/></Provider>)

    screen.debug();
})