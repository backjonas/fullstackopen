import { useState } from 'react' 

const BlogForm = ({ createBlog }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    url: ''
  })

  const addBlog = async (event) => {
    event.preventDefault()
    await createBlog(formData)
    setFormData({title: '', author: '', url: ''})
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
}

export default BlogForm