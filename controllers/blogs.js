const notesRouter = require('express').Router()
const Blog = require('../models/blogs')


notesRouter.get('/', (request, response, next) => {
    Blog
    .find({})
    .then(blogs => {
        response.json(blogs)
    })
    .catch(error => next(error))
})

notesRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    
    blog
    .save()
    .then(result => {
        response.status(201).json(result)
    })
})


module.exports = notesRouter