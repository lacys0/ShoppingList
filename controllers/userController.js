const userStore = require("../dataStore/users");

module.exports = {
  getUsers: (req, res) => {
    const users = userStore.getUsersFromStore();
    res.json(users);
  },

  createUser: (req, res) => {
    const user = req.body;

    user.id = Math.random().toString(36).substr(2, 9);
    userStore.addUserToStore(user);
    res.json(user);
  },

  getUserById: (req, res) => {
    const id = req.params.id;
    const user = userStore.getUserByIdFromStore(id);
    res.json(user);
  },

  deleteUser: (req, res) => {
    const id = req.params.id;
    userStore.deleteUserFromStore(id);
    res.json({ message: "User deleted" });
  },

  updateUser: (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    userStore.updateUserInStore(id, updatedUser);
    res.json(updatedUser);
  },
};
