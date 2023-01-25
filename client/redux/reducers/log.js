export const LOG_UPDATE = '@log/LOG_UPDATE'

const initialState = {
  logList: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOG_UPDATE: {
      return {
        ...state,
        logList: action.payload
      }
    }
    default:
      return state
  }
}
