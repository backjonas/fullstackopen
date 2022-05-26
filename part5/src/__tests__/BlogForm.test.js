import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from '../components/BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm createBlog={addBlog} />)

  const titleInput = container.querySelector('#blog-title-input')
  const authorInput = container.querySelector('#blog-author-input')
  const urlInput = container.querySelector('#blog-url-input')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'testing title...' )
  await user.type(authorInput, 'testing author...' )
  await user.type(urlInput, 'testing url...' )
  await user.click(sendButton)
 
  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('testing title...' )
  expect(addBlog.mock.calls[0][0].author).toBe('testing author...' )
  expect(addBlog.mock.calls[0][0].url).toBe('testing url...' )
})