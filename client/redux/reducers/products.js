import { LOADED } from './settings'

const GET_PRODUCTS = '@products/GET_PRODUCTS'

const initialState = {
  list: {}
}

function getObjectFromArray(list) {
  return list.reduce((acc, rec) => {
    acc[rec.id] = rec
    acc[rec.id].image = `https://source.unsplash.com/800x600/?${/\w+(?=\s)/gi.exec(rec.title)}`
    return acc
  }, {})
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        list: getObjectFromArray(action.payload)
      }
    }
    default:
      return state
  }
}

export const getProductsFromServer = () => {
  return (dispatch) => {
    fetch('/api/v1/products')
      .then((data) => data.json())
      .then((products) => {
        dispatch({ type: GET_PRODUCTS, payload: products })
        dispatch({ type: LOADED, payload: true })
      })
      .catch((err) => console.log(err))
  }
}

export const sortProducts = (sortType, direction) => {
  return (dispatch) => {
    fetch('/api/v1/sort', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sortType, direction })
    })
      .then((data) => data.json())
      .then((sortedProductsArray) => {
        dispatch({ type: GET_PRODUCTS, payload: sortedProductsArray })
      })
      .catch((err) => console.log(err))
  }
}
