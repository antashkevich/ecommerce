const GET_RATES = '@settings/GET_RATES'
const CHANGE_CURRENCY = '@settings/CHANGE_CURRENCY'

const initialState = {
  rates: {
    USD: 1
  },
  currencyName: 'USD'
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_RATES: {
      return {
        ...state,
        rates: action.payload
      }
    }
    case CHANGE_CURRENCY: {
      return {
        ...state,
        currencyName: action.payload
      }
    }
    default:
      return state
  }
}

export const getRates = () => {
  return (dispatch) => {
    fetch('/api/v1/currency')
      .then((obj) => obj.json())
      .then((rates) => {
        dispatch({ type: GET_RATES, payload: rates })
      })
      .catch((err) => console.log(err))
  }
}

export const changeCurrency = (name) => {
  return { type: CHANGE_CURRENCY, payload: name }
}
