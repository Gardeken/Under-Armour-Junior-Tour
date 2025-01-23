const sendEmailRouter = require("express").Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "planillas.torneo@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

sendEmailRouter.post("/sendEmail", async (req, res) => {
  const {
    inputName,
    inputLast,
    inputAge,
    inputNumber,
    inputEmail,
    inputDate,
    inputNameR,
    inputSocio,
    inputFranela,
    inputPantalon,
    inputZapato,
  } = req.body;
  try {
    await transporter.sendMail({
      from: "Planilla de inscripción <dominicode.xyz@gmail.com>",
      to: "planillas.torneo@gmail.com",
      subject: "Planilla de inscripción",
      text: `
      Nombre: ${inputName}
      Apellido: ${inputLast}
      Edad: ${inputAge}
      Fecha de nacimiento: ${inputDate}
      Nombre del representante: ${inputNameR}
      Teléfono de contacto: ${inputNumber}
      Socio del club: ${inputSocio}
      Talla franela: ${inputFranela}
      Talla pantalon: ${inputPantalon}
      Talla zapato: ${inputZapato}
      
      `,
    });
    await transporter.sendMail({
      from: "Under Armour Junior Tour <dominicode.xyz@gmail.com>",
      to: `${inputEmail}`,
      subject: "Planilla de inscripción",
      text: `
      Felicitaciones ${inputName} ${inputLast},
      Te has inscrito exitosamente.
      `,
    });
    res.json({ message: "Tu inscripción ha sido enviada con éxito" });
  } catch (error) {
    res.status(400).json({
      message: "Error al enviar el correo electrónico",
    });
  }
});

module.exports = sendEmailRouter;
