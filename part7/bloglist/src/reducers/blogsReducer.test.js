import deepFreeze from "deep-freeze";
import blogsReducer from "./blogsReducer";

describe("Blogs reducer", () => {
  const BLOGS_ADDED = "blogs/added";
  const BLOGS_INIT = "blogs/init";
  const BLOGS_DELETED = "blogs/deleted";
  const BLOGS_LIKED = "blogs/liked";

  const initialBlogs = [
    {
      author: "Jan Brzechwa",
      title: "Opowieści drastyczne",
      url: "https://brzechwa.pl",
      likes: 1337,
      id: "5f625efb9977296adfb097b7",
      user: {
        username: "root",
        name: "Root",
        id: "5f625efb9977296adfb097b6",
      },
    },
    {
      author: "Stanisław Lem",
      title: "Dzienniki Gwiazdowe",
      url: "https://lem.pl",
      likes: 3137,
      id: "5f625efc9977296adfb097b8",
      user: {
        username: "root",
        name: "Root",
        id: "5f625efb9977296adfb097b6",
      },
    },
  ];

  test("initializes state correctly", () => {
    const action = { type: BLOGS_INIT, blogs: initialBlogs };
    const state = [];
    deepFreeze(state);

    const newState = blogsReducer(state, action);
    expect(newState).toHaveLength(initialBlogs.length);
  });

  test("adds a blog", () => {
    const savedBlog = {
      author: "Isaac Asimov",
      title: "Ja, robot",
      url: "https://asimov.pl",
      likes: 137,
      id: "5f625efc9977296adfb097b9",
      user: {
        username: "root",
        name: "Root",
        id: "5f625efb9977296adfb097b6",
      },
    };
    const action = { type: BLOGS_ADDED, blog: savedBlog };

    deepFreeze(initialBlogs);
    const newState = blogsReducer(initialBlogs, action);
    expect(newState).toHaveLength(initialBlogs.length + 1);
  });
  test("deletes a blog", () => {
    const id = "5f625efb9977296adfb097b7";
    const action = { type: BLOGS_DELETED, id };

    deepFreeze(initialBlogs);
    const newState = blogsReducer(initialBlogs, action);
    const deletedBlog = newState.find((blog) => blog.id === id);
    expect(newState).toHaveLength(initialBlogs.length - 1);
    expect(deletedBlog).toBe(undefined);
  });

  test("updates likes in a blog", () => {
    const id = "5f625efb9977296adfb097b7";
    const likes = 8492;
    const action = { type: BLOGS_LIKED, id, likes };

    deepFreeze(initialBlogs);
    const newState = blogsReducer(initialBlogs, action);
    const likedBlog = newState.find((blog) => blog.id === id);
    expect(likedBlog).toHaveProperty("likes", likes);
  });
});
