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
      {/* <div className="flex justify-between flex-wrap gap-y-4 p-4 products shadow-xl rounded-lg">
        {Object.keys(productInCart).map((cart) => {
          return (
            <div
              key={cart}
              className="flex flex-col grow p-4 product rounded-lg gap-x-4 shadow-xl"
              title={product.description}
            >
              <img
                className="h-48 object-cover rounded-lg mb-2 product__image"
                src={product[cart].image}
                alt={product[cart].title}
              />
              <h3 className="font-semibold text-ellipsis text-lg whitespace-nowrap overflow-hidden mb-2 product__title">
                {product[cart].title}
              </h3>
              <p className="product__price">{product[cart].price}</p>
              <p className="product__amout">{productInCart[cart].amount}</p>
              <p className="product__total_price">{productInCart[cart]?.totalPrice}</p>
          </div>
          )
        })}
      </div> */}

      <div id="total-amount">{totalAmount}</div>
      <div id="total-price">
        {(totalPrice * rates[currencyName]).toFixed(2)} {currencyName}
      </div>
    </div>
  )
}

export default Cart
