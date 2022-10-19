import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      const message = action.payload
      return message
    },
    clearNotification(state, action) {
      if (action.payload === state) {
        return ''
      } else {
        return state
      }
    }
  }
})

export const { createNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer