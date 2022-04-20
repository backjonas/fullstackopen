const logger = require('../utils/logger');
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.get('/:id', async (request, response, error) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }  
  } catch(e) {
    error(e);
  }
});

blogRouter.post('/', middleware.userExtractor, async (request, response, error) => {
  try {
    const user = request.user;
    const blog = new Blog({ ...request.body, user: user._id });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (e) {
    error(e);
    //response.status(400).end();
  }
});

blogRouter.delete('/:id', middleware.userExtractor, async (request, response, error) => {
  try {
    const userId = request.user.id;
    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).end();
    }
    if (!userId || userId.toString() !== blog.user.toString()) {
      return response.status(403).json({ error: 'Invalid credentials' })
    }
    await blog.remove();
    response.status(204).end();  
  } catch(e) {
    error(e);
  }
})

blogRouter.put('/:id', async (request, response, error) => {
  try {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id, blog, { new: true }
    )
    if (updatedBlog) {
      response.json(updatedBlog);
    } else {
      response.status(400).end();
    }
  } catch (e) {
    error(e);
  }
})

module.exports = blogRouter;