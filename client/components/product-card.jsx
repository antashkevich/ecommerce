import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addItem, removeItem } from '../redux/reducers/cart'

const ProductCard = ({ product }) => {
  // debugger
  const dispatch = useDispatch()
  const [isOpenNotice, setOpenNotice] = useState(false)
  const { rates, currencyName } = useSelector((s) => s.settings)
  const { list } = useSelector((s) => s.cart)

  const toggleNotice = () => {
    setOpenNotice(!isOpenNotice)
  }

  return (
    <div className="flex flex-col grow p-4 product rounded-lg gap-x-4 shadow-xl relative overflow-hidden">
      <h2 className="font-semibold text-ellipsis text-lg whitespace-nowrap overflow-hidden mb-2 card__title">
        {product.title}
      </h2>
      <img
        className="h-48 object-cover rounded-lg mb-2 card__image"
        src={product.image}
        alt={product.title}
      />
      <div className="flex font-semibold justify-center mb-4 card__price">
        {(product.price * rates[currencyName]).toFixed(2)}
        <span className="currency ml-1">{currencyName}</span>
      </div>
      <div className="flex justify-between items-center">
        <button
          className="flex items-center justify-center font-semibold text-white rounded-lg product-btn"
          type="button"
          onClick={() => dispatch(addItem(product.id))}
        >
          +
        </button>
        <span className="card__product-amount">{list[product.id]?.amount || 0}</span>
        <button
          className={`flex items-center justify-center font-semibold text-white rounded-lg product-btn ${
            list[product.id]?.amount <= 0 || list[product.id]?.amount === undefined
              ? 'disabled'
              : ''
          }`}
          type="button"
          onClick={() => dispatch(removeItem(product.id))}
        >
          -
        </button>
      </div>
      <div className={`card__description ${isOpenNotice ? 'card__description_open' : ''}`}>
        {product.description}
      </div>
      <button
        type="button"
        className={`card__notice flex items-center justify-center font-semibold rounded-lg ${
          isOpenNotice ? 'card__notice_open' : ''
        }`}
        onClick={toggleNotice}
      >
        i
      </button>
    </div>
  )
}

export default ProductCard
