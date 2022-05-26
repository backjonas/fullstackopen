import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  let container
  let mockLikeBlog
  let mockRemoveBlog

  beforeEach(() => {
    const user = {
      id: "userid123",
      name: "some name",
      username: "username"
    }
  
    const blog = {
      title: 'blogTitle',
      author: 'blogAuthor',
      url: 'blogUrl',
      likes: 1,
      user: user,
      id: "blogid123"
    }
    
    mockLikeBlog = jest.fn()
    mockRemoveBlog = jest.fn()

    container = render(
      <Blog
        key={blog.id}
        blog={blog}
        likeBlog={mockLikeBlog}
        removeBlog={mockRemoveBlog}
        user={user}
      />
    ).container
  })

  test('only renders title and author by default', () => {
    const div = container.querySelector('.blog')
    
    expect(div).toHaveTextContent('blogTitle')
    expect(div).toHaveTextContent('blogAuthor')
    expect(div).not.toHaveTextContent('blogUrl')
    expect(div).not.toHaveTextContent('likes')
    expect(div).not.toHaveTextContent('some name')
  })

  test('renders all information after clicking \"view\"', async () => {
    const button = screen.getByText('view')
    const user = userEvent.setup()
    await user.click(button)

    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent('blogTitle')
    expect(div).toHaveTextContent('blogAuthor')
    expect(div).toHaveTextContent('blogUrl')
    expect(div).toHaveTextContent('likes 1')
    expect(div).toHaveTextContent('some name')
  })

  test('calls the event handler when clicking \"like\"', async () => {
    expect(mockLikeBlog.mock.calls).toHaveLength(0)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeBlog.mock.calls).toHaveLength(2)
  })

})

