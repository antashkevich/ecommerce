import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeCurrency } from '../redux/reducers/settings'

const ButtonGroup = () => {
  const btns = ['USD', 'EUR', 'CAD']
  const dispatch = useDispatch()
  const { currencyName } = useSelector((store) => store.settings)

  const handleBtn = (e) => {
    dispatch(changeCurrency(e.target.innerText))
  }

  return (
    <div className="flex justify-between p-4 rounded-lg gap-x-4 button-group">
      {btns.map((btn) => (
        <button
          type="button"
          className={`text-white font-semibold ${currencyName === btn && 'button-group-active'}`}
          key={btn}
          onClick={(e) => handleBtn(e)}
        >
          {btn}
        </button>
      ))}
    </div>
  )
}

export default ButtonGroup
