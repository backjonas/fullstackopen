import { useState } from 'react'


const Blog = ({blog, likeBlog, removeBlog, user}) => {
  const [visible, setVisible] = useState(false)
 
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const toggleButton = () => (
    <button onClick={toggleVisibility}>
      {visible ? 'hide' : 'view'}
    </button>
  )

  const removeButton = () => {
    if (blog.user && user.username === blog.user.username) {
      return (
        <>
        <br/>
        <button onClick={removeBlog}>
          remove
        </button>
        </>
      )
    }
  }

  const blogInformation = () => (
    <>
      <br/>
      {blog.url}
      <br/>
      {`likes ${blog.likes}`}
      <button onClick={likeBlog}>
        like
      </button>
      <br/>
      {blog.user  ? blog.user.name : 'no user found' }
      {removeButton()}
    </>
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      { toggleButton() }
      { visible ? blogInformation() : null }
    </div>  
  )
}

export default Blog