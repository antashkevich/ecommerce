import React from 'react'
import { useDispatch } from 'react-redux'
import { changeCurrency } from '../redux/reducers/settings'

const ButtonGroup = () => {
  const dispatch = useDispatch()

  return (
    <div className="flex justify-between p-4 rounded-lg gap-x-4 button-group">
      <button
        type="button"
        className="text-white font-semibold"
        onClick={(e) => {
          dispatch(changeCurrency(e.target.innerText))
        }}
      >
        USD
      </button>
      <button
        type="button"
        className="text-white font-semibold"
        onClick={(e) => dispatch(changeCurrency(e.target.innerText))}
      >
        EUR
      </button>
      <button
        type="button"
        className="text-white font-semibold"
        onClick={(e) => dispatch(changeCurrency(e.target.innerText))}
      >
        CAD
      </button>
    </div>
  )
}

export default ButtonGroup
