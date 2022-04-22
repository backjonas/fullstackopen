import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    url: ''
  })
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [currentMessage, setCurrentMessage] = useState({
    content: null, 
    type: ''
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
      setCurrentMessage({content: null, type: null})        
    }, 5000)
  }

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const response = await blogService.create(formData)
      setBlogs(await blogService.getAll())
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
    setFormData({title: '', author: '', url: ''})
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

  const blogForm = () => (
    <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input
          type="text"
          value={formData.title}
          name="title"
          onChange={handleFormChange}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={formData.author}
          name="author"
          onChange={handleFormChange}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={formData.url}
          name="url"
          onChange={handleFormChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

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
      <p>{user.name} logged in</p>
      {blogForm()}
      <p><button onClick={handleLogout}>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App