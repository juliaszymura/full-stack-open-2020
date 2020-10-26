const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const testHelper = require("./test_helper");
const testData = require("./test_data");

const api = supertest(app);

beforeAll(async () => {
  await testHelper.initUserDatabase(testData.initialUsers);
});

beforeEach(async () => {
  await testHelper.initBlogDatabase(testData.initialBlogs);
});

describe("Reading blogs", () => {
  describe("Response requirements", () => {
    test("GET /api/blogs returns all initial blogs", async () => {
      const blogs = await testHelper.blogsInDB();
      const response = await api.get("/api/blogs");

      expect(Object.keys(response.body)).toHaveLength(blogs.length);
    });

    test("Blogs are returned as JSON", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    test("Blog has a unique identifier that is named 'id'", async () => {
      const response = await api.get("/api/blogs");
      expect(response.body[0].id).toBeDefined();
    });
  });
});

describe("Saving blogs", () => {
  test("POST '/api/blogs' with valid blog data adds blog to db", async () => {
    const beforeBlogs = await testHelper.blogsInDB();
    await testHelper.apiSaveBlogAsRoot(testData.newBlog);
    const afterBlogs = await testHelper.blogsInDB();

    expect(afterBlogs.length - beforeBlogs.length).toBe(1);
  });

  describe("Request requirements", () => {
    test("Server responds with 401 when authorization header absent", async () => {
      const response = await api
        .post("/api/blogs")
        .set("Accept", "application/json")
        .send(testData.newBlog);

      expect(response.status).toBe(401);
    });

    test("Server responds with 401 when authorization token invalid", async () => {
      const response = await api
        .post("/api/blogs")
        .set("Accept", "application/json")
        .set("Authorization", "32456547467")
        .send(testData.newBlog);

      expect(response.status).toBe(401);
    });
  });

  describe("Response requirements for valid blog", () => {
    test("Server responds with 201 status code", async () => {
      const response = await testHelper.apiSaveBlogAsRoot(testData.newBlog);

      expect(response.status).toBe(201);
    });

    test("Blog content is saved correctly", async () => {
      await testHelper.apiSaveBlogAsRoot(testData.newBlog);

      const response = await api.get("/api/blogs");

      const addedBlog = response.body.find(
        (blog) => blog.title === testData.newBlog.title
      );

      expect(addedBlog).toMatchObject(testData.newBlog);
      expect(addedBlog.user).toHaveProperty("username");
    });
  });
  describe("Blog properties requirements", () => {
    test("Server adds 0 as default value when likes is missing", async () => {
      const response = await testHelper.apiSaveBlogAsRoot(
        testData.newBlogMissingLikes
      );

      expect(response.body.likes).toBe(0);
    });

    test("Server rejects blog with 400 status code when title property is missing", async () => {
      const response = await testHelper.apiSaveBlogAsRoot(
        testData.newBlogMissingTitle
      );

      expect(response.status).toBe(400);
    });

    test("Server rejects blog with 400 status code when url property is missing", async () => {
      const response = await testHelper.apiSaveBlogAsRoot(
        testData.newBlogMissingUrl
      );

      expect(response.status).toBe(400);
    });
  });
});

describe("Deleting blogs", () => {
  describe("Request requirements", () => {
    test("Server responds with 401 when authorization header absent", async () => {
      const res = await api.get("/api/blogs");
      const [lastBlog] = res.body.slice(-1);

      const response = await api.delete(`/api/blogs/${lastBlog.id}`);
      expect(response.status).toBe(401);
    });
    test("Server responds with 401 when authorization token invalid", async () => {
      const res = await api.get("/api/blogs");
      const [lastBlog] = res.body.slice(-1);

      const response = await api
        .delete(`/api/blogs/${lastBlog.id}`)
        .set("Authorization", "32456547467");
      expect(response.status).toBe(401);
    });
  });

  describe("Response requirements", () => {
    test("Server responds with 204 status code when receiving creator token", async () => {
      const r = await api.get("/api/blogs");
      const [lastBlog] = r.body.slice(-1);

      const response = await testHelper.apiDeleteBlogAsRoot(lastBlog.id);

      expect(response.status).toBe(204);
    });

    test("Server responds with 401 status code when receiving non-creator token", async () => {
      const r = await api.get("/api/blogs");
      const [lastBlog] = r.body.slice(-1);
      const nonRoot = testData.initialUsers.find(
        (user) => user.username !== "root"
      );

      const res = await api
        .post("/api/login")
        .set("Accept", "application/json")
        .send({ username: nonRoot.username, password: nonRoot.password });

      const response = await api
        .delete(`/api/blogs/${lastBlog.id}`)
        .set("Authorization", `bearer ${res.body.token}`);

      expect(response.status).toBe(401);
    });
  });

  test("DELETE 'api/blogs/:id' with the creators token removes blog from database", async () => {
    const r = await api.get("/api/blogs");
    const [lastBlog] = r.body.slice(-1);

    await testHelper.apiDeleteBlogAsRoot(lastBlog.id);

    const response = await api.get("/api/blogs");

    expect(Object.keys(response.body)).toHaveLength(2);
  });
});

describe("Updating blogs", () => {
  describe("Response requirements", () => {
    test("Server responds with updated data", async () => {
      const res = await api.get("/api/blogs");
      const [lastBlog] = res.body.slice(-1);

      const response = await api
        .put(`/api/blogs/${lastBlog.id}`)
        .set("Accept", "application/json")
        .send({ ...lastBlog, likes: 1337 });

      expect(response.body.likes).toBe(1337);
    });

    test("Server responds with 200 status code", async () => {
      const res = await api.get("/api/blogs");
      const [lastBlog] = res.body.slice(-1);

      const response = await api
        .put(`/api/blogs/${lastBlog.id}`)
        .set("Accept", "application/json")
        .send({ ...lastBlog, likes: 1337 });

      expect(response.status).toBe(200);
    });
  });

  test("Blog content is updated in database", async () => {
    const res = await api.get("/api/blogs");
    const [lastBlog] = res.body.slice(-1);

    await api
      .put(`/api/blogs/${lastBlog.id}`)
      .set("Accept", "application/json")
      .send({ ...lastBlog, likes: 1337 });

    const response = await api.get("/api/blogs");
    const updatedBlog = response.body.find((blog) => blog.id === lastBlog.id);

    expect(updatedBlog.likes).toBe(1337);
  });
});

describe("Commenting blogs", () => {
  test("Server saves new comment in database", async () => {
    const res = await api.get("/api/blogs");
    const [lastBlog] = res.body.slice(-1);
    const comment = { comment: "great blog!" };

    await api
      .post(`/api/blogs/${lastBlog.id}/comments`)
      .set("Accept", "application/json")
      .send(comment);

    const blogs = await testHelper.blogsInDB();
    const savedBlog = blogs.find((blog) => blog._id.toString() === lastBlog.id);

    expect(savedBlog.comments).toHaveLength(1);
    expect(savedBlog.comments[0]).toBe(comment.comment);
  });
  test("Server responds with updated bloglist", async () => {
    const res = await api.get("/api/blogs");
    const [lastBlog] = res.body.slice(-1);
    const comment = { comment: "great blog!" };

    const response = await api
      .post(`/api/blogs/${lastBlog.id}/comments`)
      .set("Accept", "application/json")
      .send(comment);

    expect(response.body).toHaveProperty("author", lastBlog.author);
    expect(response.body).toHaveProperty("id", lastBlog.id);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("title", lastBlog.title);
    expect(response.body).toHaveProperty("url", lastBlog.url);
    expect(response.body).toHaveProperty("likes", lastBlog.likes);
    expect(response.body).toHaveProperty("comments", [comment.comment]);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
