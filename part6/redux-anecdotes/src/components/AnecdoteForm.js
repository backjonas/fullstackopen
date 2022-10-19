import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { clearNotification, createNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    
    const notificationMessage = `New anecdote created: '${newAnecdote.content}'`
    dispatch(createNotification(notificationMessage))
    setTimeout(() => dispatch(clearNotification(notificationMessage)), 5000)
  }

  return (
    <form onSubmit={addAnecdote}>
      <div><input name="note" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm