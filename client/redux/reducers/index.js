import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import products from './products'
import settings from './settings'
import cart from './cart'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    products,
    settings,
    cart
  })

export default createRootReducer
