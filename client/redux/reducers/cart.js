const ADD_COUNT_ITEM = '@cart/ADD_COUNT_ITEM'
const REMOVE_COUNT_ITEM = '@cart/REMOVE_COUNT_ITEM'
const INCREASE_AMOUNT = '@cart/INCREASE_AMOUNT'
const DECREASE_AMOUNT = '@cart/DECREASE_AMOUNT'
const REMOVE_ITEM = '@cart/REMOVE_ITEM'
const TOTAL_VALUES = '@cart/TOTAL_VALUE'

const initialState = {
  list: {},
  totalPrice: 0,
  totalAmount: 0
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_COUNT_ITEM: {
      return {
        ...state,
        list: action.payload.list,
        totalAmount: state.totalAmount + 1,
        totalPrice: state.totalPrice + action.payload.price
      }
    }

    case REMOVE_COUNT_ITEM: {
      return {
        ...state,
        list: action.payload.list,
        totalAmount: state.totalAmount - 1,
        totalPrice: state.totalPrice - action.payload.price
      }
    }

    case INCREASE_AMOUNT:
    case DECREASE_AMOUNT: {
      return {
        ...state,
        list: {
          ...state.list,
          ...action.payload
        }
      }
    }

    case REMOVE_ITEM: {
      return {
        ...state,
        list: action.payload
      }
    }

    case TOTAL_VALUES: {
      return {
        ...state,
        totalPrice: action.payload.totalPrice,
        totalAmount: action.payload.totalAmount
      }
    }

    default:
      return state
  }
}

export const addItem = (id) => {
  return (dispatch, getState) => {
    const { list } = getState().cart
    const { price } = getState().products.list[id]
    const itemAmount = typeof list[id] === 'undefined' ? 1 : list[id].amount + 1

    return dispatch({
      type: ADD_COUNT_ITEM,
      payload: {
        list: {
          ...list,
          [id]: { amount: itemAmount }
        },
        price
      }
    })
  }
}

export const removeItem = (id) => {
  return (dispatch, getState) => {
    const { list } = getState().cart
    const { price } = getState().products.list[id]
    const itemAmount = typeof list[id] === 'undefined' ? 0 : list[id].amount - 1

    return dispatch({
      type: REMOVE_COUNT_ITEM,
      payload: {
        list: {
          ...list,
          [id]: { amount: itemAmount }
        },
        price
      }
    })
  }
}

export const changeItemAmount = (id, count) => {
  return (dispatch, getState) => {
    const { list, totalPrice, totalAmount } = getState().cart
    const { price } = getState().products.list[id]
    const { amount } = list[id]
    const newAmount = amount + count

    if (count > 0) {
      dispatch({
        type: INCREASE_AMOUNT,
        payload: {
          [id]: { amount: newAmount }
        }
      })
    }
    if (count < 0) {
      dispatch({
        type: DECREASE_AMOUNT,
        payload: {
          [id]: { amount: newAmount }
        }
      })
    }

    dispatch({
      type: TOTAL_VALUES,
      payload: {
        totalPrice: totalPrice + price * count,
        totalAmount: totalAmount + count
      }
    })
  }
}

export const removeCurrentItem = (id) => {
  return (dispatch, getState) => {
    const { list, totalPrice, totalAmount } = getState().cart
    const { price } = getState().products.list[id]
    const removedProductAmount = list[id].amount
    delete list[id]

    dispatch({
      type: REMOVE_ITEM,
      payload: list
    })

    dispatch({
      type: TOTAL_VALUES,
      payload: {
        totalPrice: totalPrice - price * removedProductAmount,
        totalAmount: totalAmount - removedProductAmount
      }
    })
  }
}
