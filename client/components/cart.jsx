import React from 'react'
import { useSelector } from 'react-redux'

import Head from './head'
import Header from './header'
import Table from './common/table'

const Cart = () => {
  const { totalPrice, totalAmount, list: productInCart } = useSelector((store) => store.cart)
  const { currencyName, rates } = useSelector((store) => store.settings)

  return (
    <div className="body">
      <Head title="Cart" />
      <Header caption="Cart Shop" />
      <Table data={Object.keys(productInCart)} />

      <div id="total-amount">{totalAmount}</div>
      <div id="total-price">
        {(totalPrice * rates[currencyName]).toFixed(2)} {currencyName}
      </div>
    </div>
  )
}

export default Cart
