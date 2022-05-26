import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    url: ''
  })

  const addBlog = async (event) => {
    event.preventDefault()
    await createBlog(formData)
    setFormData({ title: '', author: '', url: '' })
  }

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          type="text"
          value={formData.title}
          name="title"
          onChange={handleFormChange}
          id="blog-title-input"
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={formData.author}
          name="author"
          onChange={handleFormChange}
          id="blog-author-input"
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={formData.url}
          name="url"
          onChange={handleFormChange}
          id="blog-url-input"
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm