const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const clearBlogDatabase = async () => {
  await Blog.deleteMany({});
};

const saveInitialBlogs = async (blogs) => {
  const response = await apiGetUsers();
  const root = response.body.find((user) => user.username === "root");
  for (let blog of blogs) {
    let blogObject = new Blog({ ...blog, user: `${root.id}` });
    await blogObject.save();
  }
};

const initBlogDatabase = async (blogs) => {
  await clearBlogDatabase();
  await saveInitialBlogs(blogs);
};

const blogsInDB = async () => {
  return await Blog.find({});
};

const apiSaveBlogAsRoot = async (blogs) => {
  const res = await api
    .post("/api/login")
    .set("Accept", "application/json")
    .send({ username: "root", password: "toor" });

  return await api
    .post("/api/blogs")
    .set("Accept", "application/json")
    .set("Authorization", `bearer ${res.body.token}`)
    .send(blogs);
};

const apiDeleteBlogAsRoot = async (id) => {
  const res = await api
    .post("/api/login")
    .set("Accept", "application/json")
    .send({ username: "root", password: "toor" });

  return await api
    .delete(`/api/blogs/${id}`)
    .set("Accept", "application/json")
    .set("Authorization", `bearer ${res.body.token}`)
    .send();
};

const clearUserDatabase = async () => {
  await User.deleteMany({});
};

const saveInitialUsers = async (users) => {
  for (let user of users) {
    const passwordHash = await bcrypt.hash(user.password, 10);
    let userObject = new User({ ...user, passwordHash });
    await userObject.save();
  }
};

const initUserDatabase = async (users) => {
  await clearUserDatabase();
  await saveInitialUsers(users);
};

const apiGetUsers = async () => {
  return await api.get("/api/users");
};

const apiSaveUser = async (user) => {
  return await api
    .post("/api/users")
    .set("Accept", "application/json")
    .send(user);
};

const usersInDb = async () => {
  return await User.find({});
};

const usersCountDifferenceAfterSave = async (user) => {
  const before = await usersInDb();
  const response = await apiSaveUser(user);
  const after = await usersInDb();
  return [after.length - before.length, response];
};

module.exports = {
  initBlogDatabase,
  blogsInDB,
  apiSaveBlogAsRoot,
  apiDeleteBlogAsRoot,
  initUserDatabase,
  apiGetUsers,
  apiSaveUser,
  usersInDb,
  usersCountDifferenceAfterSave,
};
