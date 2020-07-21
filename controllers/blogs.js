const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response) => { 
    const notes = await Blog.find({})
    response.json(notes)
})

// const blogsRouter = require('express').Router()
// const Blog = require('../models/blogs')


// blogsRouter.get('/', (request, response, next) => {
//     console.log("test")
//     Blog
//     .find({})
//     .then(blogs => {
//         response.json(blogs)
//     })
//     .catch(error => next(error))
// })

// blogsRouter.post('/', (request, response) => {
//     const blog = new Blog(request.body)
    
//     blog
//     .save()
//     .then(result => {
//         response.status(201).json(result)
//     })
// })


module.exports = blogsRouter