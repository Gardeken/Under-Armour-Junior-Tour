const mongoose = require("mongoose");
const adminRouter = require("../controllers/admins.js");

const adminSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
});

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;
