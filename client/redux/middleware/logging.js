import {
  ADD_COUNT_ITEM,
  REMOVE_ITEM,
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
  REMOVE_COUNT_ITEM
} from '../reducers/cart'
import { LOG_UPDATE } from '../reducers/log'
import { CHANGE_CURRENCY, SET_SORT_DIRECTION } from '../reducers/settings'

const LoggingMiddleware = () => {
  return (store) => {
    const { dispatch, getState } = store
    return (next) => {
      return (action) => {
        const formatedDate = () => {
          const ISOdate = new Date().toISOString()
          return `${ISOdate.slice(0, 10)} ${ISOdate.slice(11, 19)}`
        }

        const setLogs = (logStr) => {
          const logId = +new Date()
          fetch('/api/v1/logs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: logId, string: logStr })
          })
            .then((r) => r.json())
            .then((list) => dispatch({ type: LOG_UPDATE, payload: list }))
            .catch((e) => console.log(e))
        }

        switch (action.type) {
          case CHANGE_CURRENCY: {
            const { currencyName } = getState().settings
            const newCurrency = action.payload
            const logString = `${formatedDate()}: change currency from ${currencyName} to ${newCurrency}`
            setLogs(logString)
            break
          }

          case ADD_COUNT_ITEM:
          case INCREASE_AMOUNT: {
            const item = action.payload.product
            const logString = `${formatedDate()}: add ${item.title} to the backet`
            setLogs(logString)
            break
          }

          case REMOVE_ITEM:
          case DECREASE_AMOUNT:
          case REMOVE_COUNT_ITEM: {
            const item = action.payload.product
            const logString = `${formatedDate()}: remove ${item.title} from the backet`
            setLogs(logString)
            break
          }

          case '@@router/LOCATION_CHANGE': {
            const url = action.payload.location.pathname
            const logString = `${formatedDate()}: navigate to ${url} page`
            setLogs(logString)
            break
          }

          case SET_SORT_DIRECTION: {
            const { sortType, direction } = action.payload
            const logString = `${formatedDate()}: sort by ${sortType} - ${
              direction[sortType] ? 'a-z' : 'z-a'
            }`
            setLogs(logString)
            break
          }
          default:
            return next(action)
        }
        return next(action)
      }
    }
  }
}
export default LoggingMiddleware()
