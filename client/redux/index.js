import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import logging from './middleware/logging'

export const history = createBrowserHistory()

const preloadedState = {}

const middleware = [routerMiddleware(history), logging, thunk]

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose
const composedEnhancers = composeFunc(applyMiddleware(...middleware))

const store = createStore(rootReducer(history), preloadedState, composedEnhancers)

export default store
