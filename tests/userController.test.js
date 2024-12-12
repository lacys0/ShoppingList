// Tests user controller
const userController = require("../controllers/userController");
const userStore = require("../dataStore/users");

jest.mock("../dataStore/users");

describe("User Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
    };
  });

  test("getUsers", () => {
    const users = [{ name: "Alice" }, { name: "Bob" }];
    userStore.getUsersFromStore.mockReturnValue(users);

    userController.getUsers(req, res);

    expect(res.json).toHaveBeenCalledWith(users);
  });

  test("createUser", () => {
    const user = { name: "Alice" };
    req.body = user;

    userController.createUser(req, res);

    expect(userStore.addUserToStore).toHaveBeenCalledWith(user);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  test("getUserById", () => {
    const id = "123";
    const user = { id, name: "Alice" };
    req.params = { id };

    userStore.getUserByIdFromStore.mockReturnValue(user);

    userController.getUserById(req, res);

    expect(userStore.getUserByIdFromStore).toHaveBeenCalledWith(id);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  test("deleteUser", () => {
    const id = "123";
    req.params = { id };

    userController.deleteUser(req, res);

    expect(userStore.deleteUserFromStore).toHaveBeenCalledWith(id);
    expect(res.json).toHaveBeenCalledWith({ message: "User deleted" });
  });

  test("updateUser", () => {
    const id = "123";
    const user = { id, name: "Alice" };
    req.params = { id };
    req.body = user;

    userController.updateUser(req, res);

    expect(userStore.updateUserInStore).toHaveBeenCalledWith(id, user);
    expect(res.json).toHaveBeenCalledWith(user);
  });
});
