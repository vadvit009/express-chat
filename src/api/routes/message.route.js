const app = require("express").Router();

const {
  getMsg,
} = require("../controllers/message");

app.get("/msg", getMsg);

module.exports = app;