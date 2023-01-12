import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeCurrency } from '../redux/reducers/settings'

const ButtonGroup = () => {
  const btns = ['USD', 'EUR', 'CAD']
  const dispatch = useDispatch()
  const [isActiveBtn, setActiveBtn] = useState(btns[0])

  const handleBtn = (e, activeBtn) => {
    setActiveBtn(activeBtn)
    dispatch(changeCurrency(e.target.innerText))
  }

  return (
    <div className="flex justify-between p-4 rounded-lg gap-x-4 button-group">
      {btns.map((btn) => (
        <button
          type="button"
          className={`text-white font-semibold ${isActiveBtn === btn && 'button-group-active'}`}
          key={btn}
          onClick={(e) => handleBtn(e, btn)}
        >
          {btn}
        </button>
      ))}
    </div>
  )
}

export default ButtonGroup
