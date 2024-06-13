const express = require("express");
const URL = require("../models/url");
const USER = require("../models/user");
const homeRoute = express.Router();
const appRoute = express.Router();
const adminRoute = express.Router();

homeRoute.get("/", (req, res) => {
  console.log("Hemlo from home page");
  return res.render("home-page");
});

homeRoute.get("/login", (req, res) => {
  return res.render("logIn-page");
});

homeRoute.get("/register", (req, res) => {
  return res.render("register-page");
});

appRoute.get("/", async (req, res) => {
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("application-page", { urls: allUrls });
});

adminRoute.get("/", async (req, res) => {
  try {
    const allUrls = await URL.find({}).populate("createdBy");
    return res.render("admin-page", { urls: allUrls });
  } catch (error) {
    console.error("Error fetching URLs: ", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = { homeRoute, appRoute, adminRoute };
