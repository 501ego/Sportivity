/**
 * Email Sending Utility
 *
 * Utiliza Nodemailer para enviar correos electrónicos.
 *
 * Funciones:
 *
 * - sendEmail(user): Envía un correo electrónico a un usuario.
 *   - Parámetros:
 *     - user: Objeto usuario que debe contener 'email' y 'token'.
 *   - Funcionalidad:
 *     - Configura y envía un correo electrónico con un enlace de confirmación.
 *   - Manejo de Errores:
 *     - Registra errores en la consola si el envío del correo falla.
 *
 * Configuración:
 * - Utiliza variables de entorno para configurar el transportador de Nodemailer.
 * - Requiere EMAIL_USER y EMAIL_PASSWORD en el archivo .env.
 * - Configura un transportador SMTP con los detalles de Gmail.
 *
 * Notas:
 * - La función 'transporter.verify()' se utiliza para validar la configuración del transportador.
 * - Es importante asegurar que las credenciales del correo electrónico estén protegidas y no expuestas.
 */

import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})
transporter.verify().then(() => {
  console.log('Ready for send emails')
})

export const sendEmail = async user => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Confirma tu email',
      html: `
                  <div>
                    <h1>Confirma tu email</h1>
                    <p>Para confirmar tu email has click en el siguiente enlace:</p>
                    <a href="http://localhost:5000/api/account/confirm/${user.token}">Confirmar correo</a>
                  </div>
                `,
    })
    console.log('Email sended')
  } catch (error) {
    console.log('Error sending email')
    console.log(error)
  }
}

1
