const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.decode(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  } else if (!body.title || !body.url) {
    return response.sendStatus(400);
  } else {
    if (body.likes === undefined) {
      body.likes = 0;
    }
    const user = await User.findById(decodedToken.id);
    const blog = new Blog({ ...body, user: user._id });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog.toJSON());
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.decode(request.token, process.env.SECRET);
  const blog = await Blog.findById(request.params.id);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  } else if (blog.user.toString() !== decodedToken.id) {
    response.sendStatus(401);
  } else {
    await Blog.findByIdAndDelete(request.params.id);
    response.sendStatus(204);
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  if (!body.title || !body.url) {
    response.sendStatus(400);
  } else {
    const blog = {
      title: body.title,
      author: body.author,
      likes: body.likes,
      url: body.url,
    };
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.json(updatedBlog);
  }
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const id = request.params.id;
  const body = request.body;
  const blog = await Blog.findById(id);
  const commentedBlog = {
    // ...blog, because destructuring causes error obj.toObj not a function
    autor: blog.author,
    title: blog.title,
    user: blog.user,
    url: blog.url,
    comments: blog.comments.concat(`${body.comment}`),
  };
  const updatedBlog = await Blog.findByIdAndUpdate(id, commentedBlog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
