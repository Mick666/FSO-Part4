const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blogs')
const User = require('../models/user')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogsRouter.get('/', async (request, response, next) => {
    let blogs = await Blog
      .find({}).populate('user', 'username name id')
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const token = getTokenFrom(request)
    console.log(token)
    if (!token) return response.status(401).json({error: 'token missing or invalid'})
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: !body.likes ? 0 : body.likes,
        user: user._id
    })
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
})

blogsRouter.put('/:id', async (request, response) => {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true });
    response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter
