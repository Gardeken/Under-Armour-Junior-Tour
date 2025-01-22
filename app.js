require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const sendEmailRouter = require("./controllers/sendEmail");
const token = process.env.DB_TOKEN;

async function ConnectBD() {
  try {
    await mongoose.connect(token);
    console.log("Se ha conectado a la BD");
  } catch (error) {
    console.log(error);
  }
}

ConnectBD();

app.use(express.json());
app.use("/", express.static(path.resolve("views", "Planilla")));
app.use("/Admin", express.static(path.resolve("views", "adminPanel")));

app.use("/controllers", express.static(path.resolve("controllers")));
app.use("/api/email", sendEmailRouter);

module.exports = app;
