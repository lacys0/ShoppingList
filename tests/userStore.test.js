// Tests user store

const fs = require("fs");
const path = require("path");
const userStore = require("../dataStore/users");

jest.mock("fs");

describe("User Store", () => {
  let usersPath;
  let users;

  beforeEach(() => {
    usersPath = path.join(__dirname, "../dataStore/users.json");
    users = [
      { id: "1", firstName: "Alice", lastName: "Smith", items: [] },
      { id: "2", firstName: "Bob", lastName: "Brown", items: [] },
    ];
  });

  test("getUsersFromStore", () => {
    fs.readFileSync.mockReturnValue(JSON.stringify(users));

    const result = userStore.getUsersFromStore();

    expect(result).toEqual(users);
  });

  test("getUsersFromStore with no file", () => {
    fs.readFileSync.mockImplementation(() => {
      throw new Error();
    });

    const result = userStore.getUsersFromStore();

    expect(result).toEqual([]);
    expect(fs.writeFileSync).toHaveBeenCalledWith(usersPath, "[]");
  });

  test("addUserToStore", () => {
    fs.readFileSync.mockReturnValue(JSON.stringify(users));
    const user = { firstName: "Charlie", lastName: "Brown", items: [] };

    userStore.addUserToStore(user);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      usersPath,
      JSON.stringify([...users, user])
    );
  });

  test("getUserByIdFromStore", () => {
    fs.readFileSync.mockReturnValue(JSON.stringify(users));
    const id = "1";

    const result = userStore.getUserByIdFromStore(id);

    expect(result).toEqual(users[0]);
  });

  test("deleteUserFromStore", () => {
    fs.readFileSync.mockReturnValue(JSON.stringify(users));
    const id = "1";

    userStore.deleteUserFromStore(id);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      usersPath,
      JSON.stringify(users.slice(1))
    );
  });

  test("updateUserInStore", () => {
    fs.readFileSync.mockReturnValue(JSON.stringify(users));
    const id = "1";
    const updatedUser = {
      id,
      firstName: "Charlie",
      lastName: "Brown",
      items: [],
    };

    userStore.updateUserInStore(id, updatedUser);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      usersPath,
      JSON.stringify([updatedUser, users[1]])
    );
  });

  test("deleteUserFromStore with no file", () => {
    fs.readFileSync.mockImplementation(() => {
      throw new Error();
    });
    const id = "1";

    userStore.deleteUserFromStore(id);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      usersPath,
      JSON.stringify([])
    );
  });

  test("getUserByIdFromStore with no file", () => {
    fs.readFileSync.mockImplementation(() => {
      throw new Error();
    });
    const id = "1";

    const result = userStore.getUserByIdFromStore(id);

    expect(result).toBeUndefined();
  });

  test("addUserToStore with no file", () => {
    fs.readFileSync.mockImplementation(() => {
      throw new Error();
    });
    const user = { firstName: "Charlie", lastName: "Brown", items: [] };

    userStore.addUserToStore(user);

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      usersPath,
      JSON.stringify([user])
    );
  });

  test("getUsersFromStore with invalid JSON", () => {
    fs.readFileSync.mockReturnValue("invalid JSON");

    const result = userStore.getUsersFromStore();

    expect(result).toEqual([]);
    expect(fs.writeFileSync).toHaveBeenCalledWith(usersPath, "[]");
  });
});
