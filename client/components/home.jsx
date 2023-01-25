import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getRates } from '../redux/reducers/settings'
import Head from './head'
import Header from './header'
import Products from './products'

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getRates())
  }, [dispatch])

  return (
    <div className="body">
      <Head title="Main page" />
      <Header caption="Shop" />
      <Products />
    </div>
  )
}

export default Home
