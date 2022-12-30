import { gql } from '@apollo/client'


export const ALL_BOOKS = gql`
query allBooks($author: String, $genre: String) {
  allBooks(
    author: $author
    genre: $genre
  ) { 
    title
    author {
      name
    }
    published 
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(
    title: $title
    published: $published
    author: $author
    genres: $genres
  ) {
    title
    published
    genres
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name
    setBornTo: $setBornTo
  ) {
    name
    born
  }
}
`

export const LOGIN = gql `
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`