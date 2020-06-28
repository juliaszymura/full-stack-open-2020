const _ = require("lodash");

const dummy = (blogs) => {
  return blogs ? 1 : 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
  if (!blogs.length) return -1;
  const favourite = blogs.reduce(
    (favourite, blog) => {
      return favourite.likes < blog.likes ? blog : favourite;
    },
    { likes: -1 }
  );
  return favourite;
};

const mostBlogs = (blogs) => {
  if (!blogs.length) return -1;
  const authors = blogs.map((blog) => blog.author);
  const authorsCount = _.countBy(authors);
  const authorMostBlogs = Object.keys(authorsCount).reduce((a, b) =>
    authorsCount[a] >= authorsCount[b] ? a : b
  );

  return authorMostBlogs;
};

const mostLikes = (blogs) => {
  if (!blogs.length) return -1;
  const authorsLikes = blogs.reduce(
    (authors, blog) => ({
      ...authors,
      [blog.author]: authors[blog.author] + blog.likes || blog.likes,
    }),
    {}
  );
  const authorMostLikes = Object.keys(authorsLikes).reduce((a, b) =>
    authorsLikes[a] >= authorsLikes[b] ? a : b
  );

  return { author: authorMostLikes, likes: authorsLikes[authorMostLikes] };
};

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };
