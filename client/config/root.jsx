import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect, StaticRouter } from 'react-router-dom'

import store, { history } from '../redux'

import Startup from './startup'

import Home from '../components/home'
import Cart from '../components/cart'
import Logs from '../components/logs'
import NotFound from '../components/404'

const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.token)
  const func = (props) => {
    if (!!user && !!user.name && !!token) <Redirect to={{ pathname: '/' }} />
    return <Component {...props} />
  }
  return <Route {...rest} render={func} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.auth.user)
  const token = useSelector((state) => state.token)

  const func = (props) => {
    if (!!user && !!user.name && !!token) return <Component {...props} />

    return (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    )
  }
  return <Route {...rest} render={func} />
}

const RouterSelector = (props) =>
  typeof window !== 'undefined' ? <ConnectedRouter {...props} /> : <StaticRouter {...props} />

const RootComponent = (props) => {
  return (
    <Provider store={store}>
      <RouterSelector history={history} location={props.location} context={props.context}>
        <Startup>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/logs" component={Logs} />
            <OnlyAnonymousRoute exact path="/anonymous-route" component={Home} />
            <Route component={NotFound} />
            <PrivateRoute exact path="/hidden-route" component={Home} />
          </Switch>
        </Startup>
      </RouterSelector>
    </Provider>
  )
}

export default RootComponent
