const Blog = require('../models/blogs')

const initialBlogs = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Mate Mateson',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 4,
        __v: 0
    },
    {
        title: 'Blog 2',
        author: 'Joe Blogg',
        url: 'https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing',
        likes: 5,
        __v: 0
    },
    {
        title: 'Blog 3',
        author: 'Mate Mateson',
        url: 'http://localhost:3001/api/asdf',
        likes: 6,
        __v: 0
    }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}