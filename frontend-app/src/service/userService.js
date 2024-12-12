const axios = require("axios");
const API_BASE_URI = "";
const ENDPOINTS = {
  GET_ALL_USERS: "/users",
  CREATE_USER: "/users",
  GET_USER_BY_ID: "/users/",
  DELETE_USER: "/users/",
  UPDATE_USER: "/users/",
};

const getUsers = async () => {
  const response = await axios.get(API_BASE_URI + ENDPOINTS.GET_ALL_USERS);
  return response.data;
};

const createUser = async (user) => {
  const response = await axios.post(API_BASE_URI + ENDPOINTS.CREATE_USER, user);
  return response.data;
};

const getUserById = async (id) => {
  const response = await axios.get(
    API_BASE_URI + ENDPOINTS.GET_USER_BY_ID + id
  );
  return response.data;
};

const deleteUser = async (id) => {
  const response = await axios.delete(
    API_BASE_URI + ENDPOINTS.DELETE_USER + id
  );
  return response.data;
};

const updateUser = async (id, user) => {
  const response = await axios.put(
    API_BASE_URI + ENDPOINTS.UPDATE_USER + id,
    user
  );
  return response.data;
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
};
