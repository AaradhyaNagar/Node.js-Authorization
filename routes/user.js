const express = require("express");
const { UserSignUp, UserLogIn, UserLogOut } = require("../controllers/user");
const registerRoute = express.Router();
const logInRoute = express.Router();
const logOutRoute = express.Router();

registerRoute.post("/", UserSignUp);
logInRoute.post("/", UserLogIn);
logOutRoute.get("/", UserLogOut);

module.exports = { registerRoute, logInRoute, logOutRoute };
