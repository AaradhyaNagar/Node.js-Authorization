const express = require("express");
const path = require("path");
const app = express();
const connectMongoDB = require("./connection");
const cookieParser = require("cookie-parser");
const PORT = 8001;

const { checkforAuthentication, restrictTo } = require("./middlewares/auth");

const { homeRoute, appRoute, adminRoute } = require("./routes/staticRouter");
const { registerRoute, logInRoute, logOutRoute } = require("./routes/user");
const { generateRoute, redirectRoute } = require("./routes/url");

connectMongoDB("mongodb://localhost:27017/userAuthorization").then(() =>
  console.log("MongoDB connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static("stylesheets"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkforAuthentication);

app.use("/", homeRoute);

app.use("/app", restrictTo(["NORMAL", "ADMIN"]), appRoute);

app.use("/admin", restrictTo(["ADMIN"]), adminRoute);

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), generateRoute);
app.use("/short", redirectRoute);

app.use("/login", logInRoute);
app.use("/register", registerRoute);
app.use("/logout", logOutRoute);

app.listen(PORT, () => console.log("Hemlo from server at PORT :", PORT));
