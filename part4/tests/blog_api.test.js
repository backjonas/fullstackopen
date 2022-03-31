const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper')
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.listWithManyBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('correct number of blogs are returned', async () => {
  const initialBlogs = await helper.blogsInDb();
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('the unique identifier is id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined();
  })
});

test('blogs can be created', async () => {
  const initialBlogs = await helper.blogsInDb()
  await api
    .post('/api/blogs')
    .send({
      title: "Title1",
      author: "Author1",
      url: "Url1",
      likes: 1
    })
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

})

test('likes for a blog will default to 0', async () => {
  const createdBlog = await api
    .post('/api/blogs')
    .send({
      title: 'Title2',
      author: 'Author2',
      url: 'Url2'
    })
  expect(createdBlog.body.likes).toEqual(0)
})

test('creating a blog without title fails', async () => {
  await api
    .post('/api/blogs')
    .send({
      author: 'Author3',
      url: 'Url3',
      likes: 2
    })
    .expect(400)
})

test('creating a blog without url fails', async () => {
  await api
    .post('/api/blogs')
    .send({
      title: 'Title4',
      author: 'Author4',
      likes: 2
    })
    .expect(400)
})

describe('deleting a blog', () => {
  test('succeeds with code 204 if id is valid', async () => {
    const initialBlogs = await helper.blogsInDb()
    const id = initialBlogs[0].id
    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
  })
})

describe('updating a blog', () => {
  test('succeeds with code 204 if id is valid', async () => {
    const initialBlogs = await helper.blogsInDb()
    const originalBlog = initialBlogs[0]

    const newBlog = {
      title: 'newTitle',
      author: 'newAuthor',
      url: 'newUrl',
      likes: 14
    }
    await api
      .put(`/api/blogs/${originalBlog.id}`)
      .send(newBlog)
    expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(newBlog.likes)
  })

  test('returns 404 if id does not exist or is broken', async () => {
    const newBlog = {
      title: 'newTitle',
      author: 'newAuthor',
      url: 'newUrl',
      likes: 14
    }

    await api
      .put('/api/blogs/nonexistent123')
      .send(newBlog)
      .expect(400)
  })
})



afterAll(() => {
  mongoose.connection.close();
});