const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    return await response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog) return response.status(404).end()
    return await response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const {title, author, url, likes = 0} = request.body

  const blog = new Blog({
    title,
    author,
    url,
    likes,
  })

  const savedBlog = await blog.save()
  return response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog) return response.status(404).end()
    return response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const {title, author, url, likes = 0} = request.body

  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(404).end()

    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes

    const updated = await blog.save()
    return response.json(updated)
})

module.exports = blogsRouter