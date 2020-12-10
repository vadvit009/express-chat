const app = require("express").Router();

const {
  register
} = require("../controllers/user");

app.post("/register", register);

module.exports = app;