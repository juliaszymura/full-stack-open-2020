describe("Blog app", function () {
  beforeEach(function () {
    cy.initDb();
  });

  it("login form is shown", function () {
    cy.contains("Log in");
    cy.contains("Username");
    cy.get("#username");
    cy.contains("Password");
    cy.get("#password");
    cy.get("#login-button");
  });

  it("allows logging in", function () {
    cy.visit("http://localhost:3000/");
    cy.get("#username").type("root");
    cy.get("#password").type("toor");
    cy.get("#login-button").click();

    cy.get("html").should("contain", "Hello Root!");
  });

  it("shows error message when logging with incorrect credentials", function () {
    cy.visit("http://localhost:3000/");
    cy.get("#username").type("root");
    cy.get("#password").type("root");
    cy.get("#login-button").click();

    cy.get(".message")
      .should("contain", "Incorrect credentials")
      .should("have.css", "color", "rgb(255, 0, 0)")
      .should("have.css", "border-style", "solid")
      .should("have.css", "border-color", "rgb(255, 0, 0)");

    cy.get("html").should("not.contain", "Hello Root!");
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login("root", "toor");
    });

    it("allows to add a new blog post", function () {
      cy.get(".hidden").contains("Add a blog").click();
      cy.get("#blog-form-author").type("Jan Brzechwa");
      cy.get("#blog-form-title").type("Opowieści drastyczne");
      cy.get("#blog-form-url").type("https://brzechwa.pl");
      cy.get("#blog-form-button").click();

      cy.contains("Opowieści drastyczne by Jan Brzechwa");
    });

    it("allows to like a blog", function () {
      cy.addBlog({
        author: "Jan Brzechwa",
        title: "Opowieści drastyczne",
        url: "https://brzechwa.pl",
      });
      cy.contains("View details").click();
      cy.get("html").should("contain", "likes: 0");

      cy.contains("Like").click();
      cy.get("html").should("contain", "likes: 1");
    });

    it("allows the creator to delete blog", function () {
      const blog = {
        author: "Jan Brzechwa",
        title: "Opowieści drastyczne",
        url: "https://brzechwa.pl",
      };
      cy.addBlog(blog);
      cy.contains("View details").click();
      cy.contains("Remove").click();

      cy.get("html").should("not.contain", `${blog.title} by ${blog.author}`);
    });

    it("doesn't allow to delete other users blog", function () {
      cy.addBlog({
        author: "Rekin Biznesu",
        title: "Tanio, dobrze i szybko - możesz wybrać tylko dwa!",
        url: "http://bizn.es",
      });
      const user = {
        username: "janusz",
        name: "Janu$h",
        password: "haselko123",
      };
      cy.request("POST", "http://localhost:3003/api/users/", user);
      cy.login("janusz", "haselko123");
      cy.contains("View details").click();
      cy.get(".blog-details").should("not.contain", "Remove");
    });

    it("blogs are sorted ascending by number of likes", function () {
      cy.addBlog({
        author: "Jan Brzechwa",
        title: "Opowieści drastyczne",
        url: "https://brzechwa.pl",
        likes: 1337,
      });
      cy.addBlog({
        author: "Stanisław Lem",
        title: "Dzienniki Gwiazdowe",
        url: "https://lem.pl",
        likes: 3137,
      });
      cy.addBlog({
        author: "Isaac Asimov",
        title: "Ja, robot",
        url: "https://asimov.pl",
        likes: 137,
      });

      cy.get("html")
        .find(".blogs")
        .find("div")
        .then((html) => {
          Object.values(html)
            .filter((div) => div.textContent !== undefined)
            .filter((div) =>
              div.innerHTML.includes("<button>View details</button")
            )
            .forEach(() => cy.contains("View details").click());
        });

      cy.get("html")
        .find(".blog-details")
        .then((blogs) => {
          Object.values(blogs)
            .filter((blog) => blog.textContent !== undefined)
            .map((blog) =>
              Number(blog.textContent.split("likes: ")[1].split(" ")[0])
            )
            .reduce((a, b) => {
              assert.isAtMost(b, a);
              return b;
            });
        });
    });
  });
});
