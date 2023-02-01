import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useBeforeunload } from 'react-beforeunload'

import { getRates } from '../redux/reducers/settings'

const Startup = (props) => {
  const dispatch = useDispatch()
  const { cart } = useSelector((s) => s)

  useEffect(() => {
    dispatch(getRates())
  }, [dispatch])

  return (
    <>
      {useBeforeunload(() => localStorage.setItem('cart', JSON.stringify(cart)))}
      {props.children}
    </>
  )
}

export default Startup
