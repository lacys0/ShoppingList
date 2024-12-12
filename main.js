const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from frontend-app/dist directory
app.use(express.static("frontend-app/dist"));

const userController = require("./controllers/userController");

app.get("/users", userController.getUsers);
app.post("/users", userController.createUser);
app.get("/users/:id", userController.getUserById);
app.delete("/users/:id", userController.deleteUser);
app.put("/users/:id", userController.updateUser);

app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.log("App is running at", process.env.APP_HOST, process.env.APP_PORT);
});
