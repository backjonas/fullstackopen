require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const Book = require('./models/book')
const Author = require('./models/author')

const JWT_SECRET = process.env.JWT_SECRET || 'some_secret_key'
const MONGODB_URI = process.env.MONGODB_URI

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!,
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {}
      if (args.genre) {
        filter.genres = args.genre
      }
      if (args.author) {
        filter.author = await Author.findOne({ name: args.author })
      }
      return Book.find(filter).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Author: {
    bookCount: async (root) => {
      return Book.find({ author: root._id }).countDocuments()
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated')
      }

      let author = await Author.findOne({ name: args.author })
      try {
        if (author === null) {
          author = new Author({ name: args.author })
          await author.save()
        }

        const book = new Book({ ...args, author })
        await book.save()
        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated')
      }

      const author = Author.findOne({ name: args.name })
      author.born = args.born

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'hardcodedpw') {
        throw new UserInputError('Wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },

  }
}


console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization: null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})