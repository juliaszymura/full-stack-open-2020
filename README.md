# Full stack open 2020

This repo contains solutions to Full stack open 2020 exerises. The course can be found here: https://fullstackopen.com/en/.

---

### Part 0 - Fundamentals of Web apps

The solutions are made to be rendered by https://www.websequencediagrams.com/.

---

### Part 1 - Introduction to React

Solutions are three SPA apps:

- Courseinfo - displays info about the course.
- Unicafe - allows to rate how good university cafe is and shows statistics.
- Anecdotes - displays a randomly picked anecdote (can be upvoted) and the most voted one.

---

### Part 2 - Communicating with server

- Courseinfo - improved version of part 1 Courseinfo.
- Countries - for a given country displays info about that country and current weather in it's capital. App uses https://restcountries.eu/ and https://weatherstack.com/ API.
- Phonebook - simple phonebook that allows adding and filtering entries. Names and phone numers are stored in db.json file.

---

### Part 3 - Programming a server with NodeJS and Express

This part focused on implementing backend for part 2 Phonebook app. This repo contains frontend from part 2 with necessary adjustments to work with different backend.

Backend is written in NodeJS and Express. Data is stored on MongoDB Atlas service and accessed using Mongoose ODM. It's implementation can be found here: https://github.com/juliaszymura/full-stack-open-2020-phonebook/.

Phonebook app is deployed here: https://murmuring-everglades-53483.herokuapp.com/.

---

### Part 4 - Testing Express server, user administration

Bloglist app allows users to save information about blogs, such as author, title, url. Users can also upvote blogs saved in the application.

Backend is written in NodeJS and Express, data is stored on MongoDB Atlas service and accessed using Mongoose ODM. User administration uses bcrypt and JWT.

---

### Part 5 - Testing React apps

Frontend for Bloglist app from part 4. Enables users to log in to the application, rate existing blogs and add new ones.

This part also contains E2E tests that use Cypress.io.

---

### Part 6 - State management with Redux

- Unicafe-redux - simplified version of Unicafe from part 1.
- Anecdotes-redux - improved version of Anecdotes app from part 1. Instead of showing selected anedotes it displays all of them.
