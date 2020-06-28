const mongoose = require("mongoose");
const testData = require("./test_data");
const testHelper = require("./test_helper");

beforeEach(async () => {
  await testHelper.initUserDatabase(testData.initialUsers);
});

describe("Reading users", () => {
  test("GET '/api/users' returns all initial users", async () => {
    const response = await testHelper.apiGetUsers();
    const users = await testHelper.usersInDb();

    expect(Object.keys(response.body)).toHaveLength(users.length);
  });
});

describe("Saving users", () => {
  test("POST '/api/users' with valid user data adds new user to db", async () => {
    const [savedUsersCount] = await testHelper.usersCountDifferenceAfterSave(
      testData.newUser
    );

    expect(savedUsersCount).toBe(1);
  });

  describe("Response requirements for valid user", () => {
    test("Server responds with 201 status code", async () => {
      const response = await testHelper.apiSaveUser(testData.newUser);

      expect(response.status).toBe(201);
    });
    test("Server responds with added user username, name and id", async () => {
      const response = await testHelper.apiSaveUser(testData.newUser);

      expect(response.body).toHaveProperty(
        "username",
        testData.newUser.username
      );
      expect(response.body).toHaveProperty("name", testData.newUser.name);
      expect(response.body).toHaveProperty("id");
    });

    test("Server doesn't send user password or hashed password", async () => {
      const response = await testHelper.apiSaveUser(testData.newUser);

      expect(response.body).not.toHaveProperty("password");
      expect(response.body).not.toHaveProperty("passwordHash");
    });
  });

  describe("User credentials requirements", () => {
    describe("Username requirements", () => {
      describe("Username must be provided", () => {
        test("Server rejects user when username not present", async () => {
          const user = { name: "Grażyna", password: "haselko123" };
          const [
            savedUsersCount,
            response,
          ] = await testHelper.usersCountDifferenceAfterSave(user);

          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty(
            "error",
            "User validation failed: username: Path `username` is required."
          );
          expect(savedUsersCount).toBe(0);
        });
      });
      describe("Username length must be minimum 3", () => {
        test("Server rejects user with username with length < 2", async () => {
          const user = {
            username: "",
            name: "Grażyna",
            password: "haselko123",
          };
          const [
            savedUsersCount,
            response,
          ] = await testHelper.usersCountDifferenceAfterSave(user);

          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty(
            "error",
            "User validation failed: username: Path `username` is required."
          );
          expect(savedUsersCount).toBe(0);
        });

        test("Server rejects user with username with length 2", async () => {
          const user = {
            username: "gr",
            name: "Grażyna",
            password: "haselko123",
          };
          const usersBefore = await testHelper.usersInDb();
          const response = await testHelper.apiSaveUser(user);
          const usersAfter = await testHelper.usersInDb();

          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty(
            "error",
            "User validation failed: username: Username must be at least 3 characters long"
          );
          expect(usersAfter).toHaveLength(usersBefore.length);
        });

        test("Server accepts user with username with length 3", async () => {
          const user = {
            username: "gra",
            name: "Grażyna",
            password: "haselko123",
          };
          const response = await testHelper.apiSaveUser(user);

          expect(response.status).toBe(201);
          expect(response.body.username).toBe(user.username);
        });

        test("Server accepts user with username with length > 3", async () => {
          const user = {
            username: "grazyna",
            name: "Grażyna",
            password: "haselko123",
          };
          const response = await testHelper.apiSaveUser(user);

          expect(response.status).toBe(201);
          expect(response.body.username).toBe(user.username);
        });
      });
      describe("Username must be unique", () => {
        test("Server rejects a duplicate username", async () => {
          const user = {
            username: "root",
            name: "root",
            password: "haselko123",
          };
          const [
            savedUsersCount,
            response,
          ] = await testHelper.usersCountDifferenceAfterSave(user);

          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty("error");
          expect(savedUsersCount).toBe(0);
        });
      });
    });

    describe("Password requirements", () => {
      describe("Password must be provided", () => {
        test("Server rejects user when password not present", async () => {
          const user = {
            username: "grazyna",
            name: "Grażyna",
          };
          const [
            savedUsersCount,
            response,
          ] = await testHelper.usersCountDifferenceAfterSave(user);

          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty(
            "error",
            "password must be provided"
          );
          expect(savedUsersCount).toBe(0);
        });
      });
      describe("Password length must be minimum 3", () => {
        test("Server rejects user when password length is < 2", async () => {
          const user = {
            username: "grazyna",
            name: "Grażyna",
            password: "",
          };
          const [
            savedUsersCount,
            response,
          ] = await testHelper.usersCountDifferenceAfterSave(user);

          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty(
            "error",
            "password must be provided"
          );
          expect(savedUsersCount).toBe(0);
        });

        test("Server rejects user when password length is 2", async () => {
          const user = {
            username: "grazyna",
            name: "Grażyna",
            password: "ha",
          };
          const [
            savedUsersCount,
            response,
          ] = await testHelper.usersCountDifferenceAfterSave(user);

          expect(response.status).toBe(400);
          expect(response.body).toHaveProperty(
            "error",
            "password must be at least 3 characters long"
          );
          expect(savedUsersCount).toBe(0);
        });

        test("Server accepts user when password length is 3", async () => {
          const user = {
            username: "grazyna",
            name: "Grażyna",
            password: "has",
          };
          const response = await testHelper.apiSaveUser(user);

          expect(response.status).toBe(201);
          expect(response.body.username).toBe(user.username);
        });

        test("Server accepts user when password length is > 3", async () => {
          const user = {
            username: "grazyna",
            name: "Grażyna",
            password: "haselko123",
          };
          const response = await testHelper.apiSaveUser(user);

          expect(response.status).toBe(201);
          expect(response.body.username).toBe(user.username);
        });
      });
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
