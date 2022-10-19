import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { clearNotification, createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createAnecdote(content))
    const notificationMessage = `New anecdote created: '${content}'`
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