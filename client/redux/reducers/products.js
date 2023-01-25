const GET_PRODUCTS = '@products/GET_PRODUCTS'

const initialState = {
  list: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        list: action.payload
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
      .then((arr) =>
        arr.reduce((acc, rec) => {
          acc[rec.id] = rec
          return acc
        }, {})
      )
      .then((products) => {
        dispatch({ type: GET_PRODUCTS, payload: products })
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
      .then((arr) =>
        arr.reduce((acc, rec) => {
          acc[rec.id] = rec
          return acc
        }, {})
      )
      .then((sortedProductsArray) => {
        dispatch({ type: GET_PRODUCTS, payload: sortedProductsArray })
      })
      .catch((err) => console.log(err))
  }
}
