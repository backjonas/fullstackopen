import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    props.createAnecdote(content)
  }

  return (
    <form onSubmit={addAnecdote}>
      <div><input name="note" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default connect(
  null,
  { createAnecdote }
)(AnecdoteForm)