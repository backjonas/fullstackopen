import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
let timeoutID

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      const message = action.payload
      return message
    },
    clearNotification(state, action) {
      return ''
    }
  }
})

export const { createNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)

    dispatch(createNotification(message))
  }
}

export default notificationSlice.reducer