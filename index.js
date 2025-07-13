require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configurar SMTP seguro
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true para 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post('/send-email', async (req, res) => {
  const { to, subject, name } = req.body;

  const htmlTemplate = fs.readFileSync('./templates/emailTemplate.html', 'utf-8');
  const personalizedHtml = htmlTemplate.replace('{{name}}', name);

  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to,
      subject,
      html: personalizedHtml,
      text: `Hola ${name}, este es un correo en texto plano.`,
    });

    res.status(200).json({ message: 'Correo enviado correctamente.' });
  } catch (error) {
    console.error('Error al enviar:', error);
    res.status(500).json({ error: 'Error al enviar el correo.' });
  }
});

app.listen(3001, () => {
  console.log('Servidor escuchando en http://localhost:3001');
});
