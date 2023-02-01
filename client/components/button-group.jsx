import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeCurrency, getRates } from '../redux/reducers/settings'

const ButtonGroup = () => {
  const dispatch = useDispatch()
  const { rates } = useSelector((s) => s.settings)
  const { currencyName } = useSelector((store) => store.settings)

  const onClickButton = (name = 'USD') => {
    dispatch(getRates())
    dispatch(changeCurrency(name.toUpperCase()))
  }

  return (
    <div className="flex justify-between p-4 rounded-lg gap-x-4 button-group">
      {Object.keys(rates).map((btn) => (
        <button
          key={btn.toLowerCase()}
          className={`text-white font-semibold ${currencyName === btn && 'button-group-active'}`}
          type="button"
          data-name={btn.toLowerCase()}
          onClick={(e) => onClickButton(e.target.dataset.name)}
        >
          {btn.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default ButtonGroup
