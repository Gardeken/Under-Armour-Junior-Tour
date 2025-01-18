require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const sendEmailRouter = require("./controllers/sendEmail");

app.use(express.json());
app.use("/", express.static(path.resolve("views")));

app.use("/controllers", express.static(path.resolve("controllers")));
app.use("/api/email", sendEmailRouter);

module.exports = app;
