export const updateBookCache = (cache, query, addedBook) => {
  const uniqueByTitle = (books) => {
    const seen = new Set()
    return books.filter((book) => {
      const bookName = book.title
      return seen.has(bookName) ? false: seen.add(bookName)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqueByTitle(allBooks.concat(addedBook))
    }
  })
}