import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [currentMessage, setCurrentMessage] = useState({
    content: null,
    type: ''
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message) => {
    setCurrentMessage(message)
    setTimeout(() => {
      setCurrentMessage({ content: null, type: null })
    }, 5000)
  }

  const blogFormRef = useRef()

  const addBlog = async (formData) => {
    try {
      const response = await blogService.create(formData)
      setBlogs(await blogService.getAll())
      blogFormRef.current.toggleVisibility()
      showNotification({
        content: `Added a new blog: ${response.title} by ${response.author}`,
        type: 'success'
      })
    } catch (exception) {
      showNotification({
        content: `The blog could not be added`,
        type: 'error'
      })
    }
  }

  const likeBlog = async (blog) => {
    try {
      await blogService.update({
        ...blog,
        ['likes']: blog.likes + 1
      })
      setBlogs(await blogService.getAll())
    } catch (exception) {
      showNotification({
        content: `Failed to update blog`,
        type: 'error'
      })
    }
  }

  const removeBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog)
        setBlogs(await blogService.getAll())
        showNotification({
          content: `Removed blog ${blog.title}`,
          type: 'success'
        })
      }
    } catch (exception) {
      console.log(exception)
      showNotification({
        content: `Failed to remove blog`,
        type: 'error'
      })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'blogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification({
        content: `Logged in as ${user.name}`,
        type: 'success'
      })

    } catch (exception) {
      showNotification({
        content: `Wrong credentials`,
        type: 'error'
      })
    }
  }

  const handleLogout = event => {
    event.preventDefault()

    window.localStorage.clear()
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => {
    return (
      <Togglable
        buttonLabel='create new blog'
        ref={blogFormRef}
        hideLabel='cancel'
      >
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to the application</h2>
        <Notification message={currentMessage} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={currentMessage} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogForm()}
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={() => likeBlog(blog)}
          removeBlog={() => removeBlog(blog)}
          user={user}
        />
      )}
    </div>
  )
}

export default App