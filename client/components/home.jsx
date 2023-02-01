import React from 'react'
import { Link } from 'react-router-dom'
import Head from './head'
import Header from './header'
import Products from './products'

const Home = () => {
  return (
    <div className="body">
      <Head title="Main page" />
      <Header caption="Shop" />
      <Products />
      <Link
        to="/logs"
        className="flex justify-between gap-x-1 px-4 py-2 rounded-lg button-group text-white font-semibold fixed bottom-4 right-4"
      >
        Logs
      </Link>
    </div>
  )
}

export default Home
