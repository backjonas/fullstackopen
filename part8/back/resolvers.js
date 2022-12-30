const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')


const JWT_SECRET = process.env.JWT_SECRET || 'some_secret_key'

const pubsub = new PubSub()

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
    allAuthors: async () => Author.find({}).populate('books'),
    allGenres: async () => Book.find({}).distinct('genres'),
    me: (root, args, context) => context.currentUser
  },
  Author: {
    bookCount: async (root) => {
      return root.books.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated')
      }

      let author = await Author.findOne({ name: args.author })
      try {
        if (author === null) {
          author = new Author({ name: args.author })
        }

        const book = new Book({ ...args, author })
        await book.save()

        author.books = author.books.concat(book)
        await author.save()

        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated')
      }
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
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
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers