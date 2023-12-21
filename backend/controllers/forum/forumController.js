/**
 * Forum Message Controllers
 *
 * Este archivo contiene controladores para manejar operaciones relacionadas con mensajes
 * en foros dentro de una aplicación.
 *
 * Controladores:
 *
 * - createMessage(req, res): Crea un nuevo mensaje en un foro.
 *   - Requiere ID de foro y datos de usuario.
 *   - Retorna el mensaje creado con datos adicionales poblados.
 *   - Gestiona errores internos del servidor.
 *
 * - getMessages(req, res): Recupera todos los mensajes de un foro específico.
 *   - Requiere ID de foro.
 *   - Retorna todos los mensajes asociados o un mensaje de error si no se encuentran.
 *   - Gestiona errores internos del servidor.
 *
 * Notas:
 * - Los controladores interactúan con ForumDAO para realizar operaciones de base de datos.
 * - Incluyen manejo de errores para asegurar una respuesta adecuada ante fallos.
 */

import ForumDAO from '../../dao/forumDAO.js'

const createMessage = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user._id
    const { message } = req.body
    const newMessage = await ForumDAO.createForum(id, userId, message)
    if (newMessage) {
      const populatedMessage = await ForumDAO.populateMessage(newMessage._id)
      //req.io.to(id).emit('new message', populatedMessage)
      return res.status(200).json(populatedMessage)
    } else {
      return res.status(500).json({ msg: 'Internal Server Error' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'Internal Server Error' })
  }
}

const getMessages = async (req, res) => {
  try {
    const { id } = req.params
    const messages = await ForumDAO.getMessages(id)
    if (messages) {
      return res.status(200).json(messages)
    } else {
      return res
        .status(404)
        .json({ msg: 'No messages found for the specified ID' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'Internal Server Error' })
  }
}

export { createMessage, getMessages }
