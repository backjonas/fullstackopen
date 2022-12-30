import { useQuery, useLazyQuery, useSubscription, useApolloClient } from '@apollo/client'
import { useState } from 'react'

import { ALL_BOOKS, BOOK_ADDED } from '../queries'
import { updateBookCache } from '../utils'


const getUniqueGenres = (books) => {
  const genres = new Set()
  books.data?.allBooks.forEach(book => {
    book.genres.forEach(genre => {
      if (!genres.has(genre)) {
        genres.add(genre)
      }
    })
  })
  return [...genres]
}

const Books = (props) => {
  const client = useApolloClient()
  const [filter, setFilter] = useState(false)
  const allBooks = useQuery(ALL_BOOKS)
  const [getFilteredBooks, filteredBooks] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'network-only',
  })

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      updateBookCache(client.cache, { query: ALL_BOOKS }, addedBook)
      window.alert(`A new book has been added: ${addedBook.title}`)
    }
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
        {getUniqueGenres(allBooks)?.map((genre) => (
          <button 
            key={genre}
            onClick={() => {
              getFilteredBooks({ variables: { genre } })
              setFilter(true)
              allBooks.refetch()
            }}
          >
            {genre}
          </button>
        ))}
        <p/>
        <button onClick={() => {
          setFilter(false)
          allBooks.refetch()
        }}>
          Reset filter
        </button>
      </div>
    </div>
  )
}

export default Books
