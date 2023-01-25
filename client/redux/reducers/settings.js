const GET_RATES = '@settings/GET_RATES'
export const CHANGE_CURRENCY = '@settings/CHANGE_CURRENCY'
export const SET_SORT_DIRECTION = '@settings/SET_SORT_DIRECTION'

const initialState = {
  rates: {
    CAD: 1.34766,
    EUR: 1.00196,
    USD: 1
  },
  currencyName: 'USD',
  sortType: 'name',
  sort: {
    name: true,
    price: true
  }
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
    case SET_SORT_DIRECTION: {
      return {
        ...state,
        sort: action.payload.direction,
        sortType: action.payload.sortType
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
  return { 
    type: CHANGE_CURRENCY, 
    payload: name
   }
}

export const setSortToggle = (sortType) => {
  return (dispatch, getState) => {
    const { sort } = getState().settings
    dispatch({
      type: SET_SORT_DIRECTION,
      payload: {
        direction: {
          ...sort,
          [sortType]: !sort[sortType]
        },
        sortType
      }
    })
  }
}
