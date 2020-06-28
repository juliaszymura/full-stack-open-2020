const listHelper = require("../utils/list_helper");
const { mostLikes } = require("../utils/list_helper");

const listWithOneBlog = [
  {
    title: "One blog",
    author: "Jest",
    url: "http://www.randomurl.org",
    likes: 3,
  },
];
const listWithSeveralBlogs = [
  {
    title: "First blog",
    author: "Jest",
    url: "http://www.randomurl.org",
    likes: 1300,
  },
  {
    title: "Second blog",
    author: "Jest",
    url: "http://www.randomurl.org",
    likes: 30,
  },
  {
    title: "Third blog",
    author: "Jest",
    url: "http://www.randomurl.org",
    likes: 7,
  },
];
const listWithEqualLikesBlogs = [
  {
    title: "First blog",
    author: "Jest",
    url: "http://www.randomurl.org",
    likes: 4,
  },
  {
    title: "Second blog",
    author: "Jest",
    url: "http://www.randomurl.org",
    likes: 10,
  },
  {
    title: "Third blog",
    author: "Jest",
    url: "http://www.randomurl.org",
    likes: 10,
  },
];
const listWithNoLikesBlogs = [
  {
    title: "First blog",
    author: "Jest",
    url: "http://www.randomurl.org",
    likes: 0,
  },
  {
    title: "Second blog",
    author: "Jest",
    url: "http://www.randomurl.org",
    likes: 0,
  },
];

describe("dummy test", () => {
  test("result is one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe("total likes", () => {
  describe("empty list of blogs", () => {
    test("result is zero", () => {
      expect(listHelper.totalLikes([])).toBe(0);
    });
  });
  describe("list with one blog", () => {
    test("result is blog's likes", () => {
      expect(listHelper.totalLikes(listWithOneBlog)).toBe(3);
    });
  });

  describe("list with more than one blog", () => {
    test("result is sum of likes", () => {
      expect(listHelper.totalLikes(listWithSeveralBlogs)).toBe(1337);
    });
  });
});

describe("favourite blog", () => {
  describe("empty list of blogs", () => {
    test("result is -1", () => {
      expect(listHelper.favouriteBlog([])).toEqual(-1);
    });
  });

  describe("list with one blog", () => {
    test("result is this blog", () => {
      const result = {
        title: "One blog",
        author: "Jest",
        url: "http://www.randomurl.org",
        likes: 3,
      };
      expect(listHelper.favouriteBlog(listWithOneBlog)).toEqual(result);
    });
  });

  describe("list with more than one blog", () => {
    test("result is the one with max likes", () => {
      const result = {
        title: "First blog",
        author: "Jest",
        url: "http://www.randomurl.org",
        likes: 1300,
      };
      expect(listHelper.favouriteBlog(listWithSeveralBlogs)).toEqual(result);
    });
    test("result is the first blog from the group of favouirite blogs", () => {
      const result = {
        title: "Second blog",
        author: "Jest",
        url: "http://www.randomurl.org",
        likes: 10,
      };
      expect(listHelper.favouriteBlog(listWithEqualLikesBlogs)).toEqual(result);
    });
    test("result is the first one when blogs have no likes", () => {
      const result = {
        title: "First blog",
        author: "Jest",
        url: "http://www.randomurl.org",
        likes: 0,
      };
      expect(listHelper.favouriteBlog(listWithNoLikesBlogs)).toEqual(result);
    });
  });
});
describe("author with most blogs", () => {
  describe("empty list of blogs", () => {
    test("result is -1", () => {
      const blogs = [];
      const result = listHelper.mostBlogs(blogs);

      expect(result).toBe(-1);
    });
  });
  describe("list with one blog", () => {
    test("result is author of that blog", () => {
      const blogs = [
        {
          title: "First blog",
          author: "Jest",
          url: "http://www.randomurl.org",
          likes: 0,
        },
      ];
      const result = listHelper.mostBlogs(blogs);

      expect(result).toBe("Jest");
    });
  });
  describe("list with more than one blog", () => {
    describe("unique authors", () => {
      test("result is author of that blog", () => {
        const blogs = [
          {
            title: "First blog",
            author: "Jest",
            url: "http://www.randomurl.org",
            likes: 0,
          },
          {
            title: "Second blog",
            author: "React",
            url: "http://www.randomurl.org",
            likes: 0,
          },
        ];
        const result = listHelper.mostBlogs(blogs);

        expect(result).toBe("Jest");
      });
    });
    describe("non-unique authors", () => {
      test("result is the author with most blogs", () => {
        const blogs = [
          {
            title: "First blog",
            author: "Jest",
            url: "http://www.randomurl.org",
            likes: 4,
          },
          {
            title: "Second blog",
            author: "React",
            url: "http://www.randomurl.org",
            likes: 0,
          },
          {
            title: "Third blog",
            author: "React",
            url: "http://www.randomurl.org",
            likes: 0,
          },
        ];
        const result = listHelper.mostBlogs(blogs);

        expect(result).toBe("React");
      });
      test("result is the first author from the group of authors with most blogs", () => {
        const blogs = [
          {
            title: "The blog",
            author: "React",
            url: "http://www.randomurl.org",
            likes: 0,
          },
          {
            title: "First blog",
            author: "Jest",
            url: "http://www.randomurl.org",
            likes: 0,
          },
          {
            title: "Second blog",
            author: "Jest",
            url: "http://www.randomurl.org",
            likes: 0,
          },
          {
            title: "Third blog",
            author: "React",
            url: "http://www.randomurl.org",
            likes: 0,
          },
        ];
        const result = listHelper.mostBlogs(blogs);

        expect(result).toBe("React");
      });
    });
  });
});

describe("author with most likes", () => {
  describe("empty list of blogs", () => {
    test("result is -1", () => {
      expect(mostLikes([])).toBe(-1);
    });
  });
  describe("list with one blog", () => {
    test("result is the author of that blog", () => {
      const blogs = [
        {
          title: "First blog",
          author: "Jest",
          url: "http://www.randomurl.org",
          likes: 1337,
        },
      ];
      expect(mostLikes(blogs)).toEqual({ author: "Jest", likes: 1337 });
    });
  });
  describe("list with more than one blog", () => {
    test("result is the author with most likes for one author with max count of likes", () => {
      const blogs = [
        {
          title: "First blog",
          author: "Jest",
          url: "http://www.randomurl.org",
          likes: 358,
        },
        {
          title: "Second blog",
          author: "React",
          url: "http://www.randomurl.org",
          likes: 1300,
        },
        {
          title: "Third blog",
          author: "React",
          url: "http://www.randomurl.org",
          likes: 37,
        },
      ];
      expect(mostLikes(blogs)).toEqual({ author: "React", likes: 1337 });
    });
    test("result is the first author with most likes for several authors with max count of likes", () => {
      const blogs = [
        {
          title: "First blog",
          author: "Jest",
          url: "http://www.randomurl.org",
          likes: 1300,
        },
        {
          title: "Second blog",
          author: "React",
          url: "http://www.randomurl.org",
          likes: 1300,
        },
        {
          title: "Third blog",
          author: "Jest",
          url: "http://www.randomurl.org",
          likes: 37,
        },
        {
          title: "Fourth blog",
          author: "React",
          url: "http://www.randomurl.org",
          likes: 37,
        },
      ];
      expect(mostLikes(blogs)).toEqual({ author: "Jest", likes: 1337 });
    });
  });
});
