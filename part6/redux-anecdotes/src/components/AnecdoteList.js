import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { clearNotification, createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const currentFilter = useSelector(state => state.filter)
  const anecdotes = useSelector((state) => {
    const regexp = new RegExp(currentFilter, 'i')
    const matchingAnecdotes = state.anecdotes.filter(anecdote =>    
      regexp.test(anecdote.content)
    )
    return matchingAnecdotes.sort((a, b) => a.votes < b.votes)
  })

  const voteForAnecdote = (anecdote) => {
    dispatch(vote(anecdote.id))
    const notificationMessage = `You voted for '${anecdote.content}'`
    dispatch(createNotification(notificationMessage))
    setTimeout(() => dispatch(clearNotification(notificationMessage)), 5000)
  }

  return(
    <ul>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteForAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </ul>
  )
}

export default AnecdoteList