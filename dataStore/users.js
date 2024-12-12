const fs = require("fs");
const path = require("path");
const usersPath = path.join(__dirname, "users.json");

module.exports = {
  getUsersFromStore: () => {
    try {
      const data = fs.readFileSync(usersPath, "utf8");
      return JSON.parse(data);
    } catch (err) {
      // If the file doesn't exist, return an empty array
      fs.writeFileSync(usersPath, "[]");
      return [];
    }
  },

  addUserToStore: (user) => {
    const users = module.exports.getUsersFromStore();
    users.push(user);
    fs.writeFileSync(usersPath, JSON.stringify(users));
  },

  getUserByIdFromStore: (id) => {
    const users = module.exports.getUsersFromStore();
    return users.find((user) => user.id === id);
  },

  deleteUserFromStore: (id) => {
    const users = module.exports.getUsersFromStore();
    const updatedUsers = users.filter((user) => user.id !== id);
    fs.writeFileSync(usersPath, JSON.stringify(updatedUsers));
  },

  updateUserInStore: (id, updatedUser) => {
    const users = module.exports.getUsersFromStore();
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return updatedUser;
      }
      return user;
    });
    fs.writeFileSync(usersPath, JSON.stringify(updatedUsers));
  },
};
