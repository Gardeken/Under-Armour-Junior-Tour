const user = require("../models/user");
const userRouter = require("express").Router();

userRouter.post("/createUser", async (req, res) => {
  const {
    inputName,
    inputLast,
    inputAge,
    inputNumber,
    inputDate,
    inputNameR,
    inputEmail,
    inputSocio,
    inputFranela,
    inputPantalon,
    inputZapato,
  } = req.body;

  const newUser = new user();
  newUser.name = `${inputName} ${inputLast}`;
  newUser.age = inputAge;
  newUser.phone = inputNumber;
  newUser.email = inputEmail;
  newUser.date = inputDate;
  newUser.nameR = inputNameR;
  newUser.club = inputSocio;
  newUser.franela = inputFranela;
  newUser.pantalon = inputPantalon;
  newUser.zapato = inputZapato;

  if (inputAge > 6 && inputAge <= 8) {
    newUser.categoria = "6-8 Age";
  } else if (inputAge > 8 && inputAge <= 10) {
    newUser.categoria = "9-10 Age";
  } else if (inputAge > 10 && inputAge <= 12) {
    newUser.categoria = "11-12 Age";
  } else if (inputAge > 12 && inputAge <= 14) {
    newUser.categoria = "13-14 Age";
  } else if (inputAge > 14 && inputAge <= 18) {
    newUser.categoria = "15-18 Age";
  }

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error",
    });
  }
});

userRouter.get("/getUsers", async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error",
    });
  }
});

module.exports = userRouter;
