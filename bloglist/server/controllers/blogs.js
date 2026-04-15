const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {
      username: 1, name: 1
    })
    return response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog) return response.status(404).end()
    return response.json(blog)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const {title, author, url, likes = 0 } = request.body
  const user = request.user

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)    
    if (!blog) return response.status(404).end()

    const user = request.user
    if (blog.user.toString() !== user._id.toString()) return response.status(403).end()
    
    await blog.deleteOne()
    return response.status(204).end()
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const {title, author, url, likes = 0} = request.body

  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(404).end()

  const user = request.user
  if (blog.user.id.toString() !== user._id.toString()) return response.status(401).end()

    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes

  const updated = await blog.save()
  return response.json(updated)
})

module.exports = blogsRouter