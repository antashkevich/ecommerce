import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeItemAmount, removeCurrentItem } from '../../redux/reducers/cart'

const TableRow = ({ id }) => {
  const dispatch = useDispatch()
  const product = useSelector((store) => store.products.list)
  const productInCart = useSelector((store) => store.cart.list)
  const { currencyName, rates } = useSelector((store) => store.settings)
  const [isCount, setCount] = useState(productInCart[id].amount)

  const decreaseCount = (productId) => {
    setCount(isCount - 1)

    dispatch(changeItemAmount(productId, -1))
  }

  const increaseCount = (productId) => {
    setCount(isCount + 1)

    dispatch(changeItemAmount(productId, +1))
  }

  return (
    <tr>
      <td>#</td>
      <td className="product__image">
        <img
          className="object-cover rounded-lg h-16 w-16"
          src={product[id].image}
          alt={product[id].title}
        />
      </td>
      <td>{product[id].title}</td>
      <td>
        {(product[id].price * rates[currencyName]).toFixed(2)} {currencyName}
      </td>
      <td>
        <div className="flex justify-between items-center">
          <button
            className="flex items-center justify-center font-semibold text-white rounded-lg product-btn"
            type="button"
            onClick={() => {
              increaseCount(id)
            }}
          >
            +
          </button>
          <span className="card__product-amount">{productInCart[id].amount}</span>
          <button
            className={`flex items-center justify-center font-semibold text-white rounded-lg product-btn ${
              isCount <= 0 ? 'disabled' : ''
            }`}
            type="button"
            onClick={() => {
              decreaseCount(id)
            }}
          >
            -
          </button>
        </div>
      </td>
      <td>
        {(product[id].price * rates[currencyName] * productInCart[id].amount).toFixed(2)}{' '}
        {currencyName}
      </td>
      <td>
        <button
          className="text-white font-semibold rounded-lg gap-x-4 p-4 btn-remove"
          type="button"
          onClick={() => {
            dispatch(removeCurrentItem(id))
          }}
        >
          Remove
        </button>
      </td>
    </tr>
  )
}

export default TableRow
