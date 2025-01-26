const mongoose = require("mongoose");
const userRouter = require("../controllers/users");

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  password: String,
  age: Number,
  email: String,
  phone: String,
  date: String,
  nameR: String,
  club: String,
  categoria: String,
  franela: String,
  pantalon: String,
  zapato: String,
  payM: String,
  payN: String,
  active: {
    type: Boolean,
    default: false,
  },
  amount: Number,
});

const user = mongoose.model("user", userSchema);

module.exports = user;
