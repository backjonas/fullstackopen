import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    const user = {
      id: "userid123",
      name: "name",
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
    
    const mockLikeBlog = jest.fn()
    const mockRemoveBlog = jest.fn()

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
  })


  

})

// test('clicking the button calls event handler once', async () => {
//   const note = {
//     content: 'Component testing is done with react-testing-library',
//     important: true
//   }

//   const mockHandler = jest.fn()

//   render(
//     <Note note={note} toggleImportance={mockHandler} />
//   )

//   const user = userEvent.setup()
//   const button = screen.getByText('make not important')
//   await user.click(button)

//   expect(mockHandler.mock.calls).toHaveLength(1)
// })

// test('does not render this', () => {
//   const note = {
//     content: 'This is a reminder',
//     important: true
//   }

//   render(<Note note={note} />)

//   const element = screen.queryByText('do not want this thing to be rendered')
//   expect(element).toBeNull()
// })