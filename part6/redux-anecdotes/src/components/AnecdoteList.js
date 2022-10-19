import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'

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

  return(
    <ul>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button 
              onClick={() => dispatch(voteForAnecdote(anecdote))}
            >vote</button>
          </div>
        </div>
      )}
    </ul>
  )
}

export default AnecdoteList