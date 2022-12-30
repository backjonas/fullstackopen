import { useQuery, useLazyQuery } from '@apollo/client'
import { useState } from 'react'

import { ALL_BOOKS, ALL_GENRES } from '../queries'


const Books = (props) => {
  const [filter, setFilter] = useState(false)
  const genres = useQuery(ALL_GENRES)
  const allBooks = useQuery(ALL_BOOKS)
  const [getFilteredBooks, filteredBooks] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'network-only',
  })

  if (!props.show) {
    return null
  }
  
  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filter ?
            filteredBooks.data?.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )) :
            allBooks.data?.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div>
        <h3>Filter by genre</h3>
        {genres.data?.allGenres.map((genre) => (
          <button 
            key={genre}
            onClick={() => {
              getFilteredBooks({ variables: { genre } })
              setFilter(true)
              allBooks.refetch()
              genres.refetch()
            }}
          >
            {genre}
          </button>
        ))}
        <p/>
        <button onClick={() => {
          setFilter(false)
          allBooks.refetch()
          genres.refetch()
        }}>
          Reset filter
        </button>
      </div>
    </div>
  )
}

export default Books
