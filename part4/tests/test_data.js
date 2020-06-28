const initialBlogs = [
  {
    title: "First blog",
    author: "Jest",
    url: "http://www.randomurl.org",
    likes: 1300,
  },
  {
    title: "Second blog",
    author: "Jest",
    url: "http://www.example.org",
    likes: 30,
  },
  {
    title: "Third blog",
    author: "Jest",
    url: "http://www.chmiel.cc",
    likes: 7,
  },
];

const newBlog = {
  title: "New blog",
  author: "Jest",
  url: "http://www.flower.com",
  likes: 13,
};

const newBlogMissingLikes = {
  title: "New blog",
  author: "Jest",
  url: "http://www.flower.com",
};

const newBlogMissingTitle = {
  author: "Jest",
  url: "http://www.flower.com",
  likes: 12,
};

const newBlogMissingUrl = {
  title: "New blog",
  author: "Jest",
  likes: 12,
};

const initialUsers = [
  {
    username: "root",
    password: "toor",
    name: "root",
  },
  {
    username: "roman",
    password: "haselko",
    name: "roman",
  },
];

const newUser = {
  username: "marian",
  password: "iksde",
  name: "Marian",
};

module.exports = {
  initialBlogs,
  newBlog,
  newBlogMissingLikes,
  newBlogMissingTitle,
  newBlogMissingUrl,
  initialUsers,
  newUser,
};
