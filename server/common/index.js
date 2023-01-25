import { readFile } from 'fs/promises'
import axios from 'axios'

export const getProductsfunc = () => {
  return readFile(`${__dirname}/../data/data.json`, 'utf-8')
    .then((data) => JSON.parse(data))
    .catch(() => [])
}

export const sortProductsLst = (arrayProducts, sortType, dir) => {
  switch (sortType) {
    case 'name': {
      arrayProducts.sort((a, b) => {
        if (dir) {
          return a.title.localeCompare(b.title)
        }
        return b.title.localeCompare(a.title)
      })
      break
    }

    case 'price': {
      arrayProducts.sort((a, b) => {
        if (dir) {
          return a.price - b.price
        }
        return b.price - a.price
      })
      break
    }

    default:
      return arrayProducts
  }

  return arrayProducts
}

export const getRates = () => {
  const urlCurrency = 'https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,CAD'
  const defaultCurrency = {
    CAD: 1.34766,
    EUR: 1.00196,
    USD: 1
  }

  return axios(urlCurrency)
    .then(({ data }) => data.rates)
    .catch(() => defaultCurrency)
}
