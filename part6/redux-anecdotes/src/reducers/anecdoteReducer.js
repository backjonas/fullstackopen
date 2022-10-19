import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'
import { setNotification } from '../reducers/notificationReducer'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      const changedAnecdote = action.payload
      return state.map(anecdote =>
        anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote 
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)  
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
    dispatch(setNotification(`New anecdote created: '${content}'`, 5))
  }
}

export const voteForAnecdote = anecdote => {
  return async dispatch => {
    const changedAnecdote = { 
      ...anecdote, 
      votes: anecdote.votes + 1
    }
    const newAnecdote = await anecdoteService.update(changedAnecdote)
    dispatch(vote(newAnecdote))
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
  }
}

export default anecdoteSlice.reducer