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

function rateChecker() {
  let ratesRequestDate = 0
  const msAtHour = 1000 * 60 * 60 // 1 Hour
  let currency = {}
  return {
    checkDate: (dateMs = 0) => (ratesRequestDate + msAtHour) <= dateMs,
    setRateDate: (dateMs = 0) => {
      ratesRequestDate = dateMs
    },
    setCurrency: (newCurrency = {}) => {
      currency = { ...newCurrency }
    },
    getRates: () => currency
  }
}

const myRates = rateChecker()

export const getRates = async () => {
  const url = 'https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,CAD'
  const mockRates = {
    CAD: 1.3,
    EUR: 0.9,
    USD: 1
  }

  const date = +new Date()

  if (myRates.checkDate(date)) {
    console.log('Wait data from exchange API...')
    await axios(url)
      .then(({ data }) => data.rates)
      .then((cur) => myRates.setCurrency(cur))
      .catch(() => mockRates)
    myRates.setRateDate(date)
  }

  return myRates.getRates()
}
