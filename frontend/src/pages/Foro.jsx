import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useForum from '../hooks/useForum'
import useCommunity from '../hooks/useCommunity'
import useAdmin from '../hooks/useAdmin'
import useMember from '../hooks/useMember'
import Alert from '../components/Alert'
import { io } from 'socket.io-client'

let socket

const Foro = () => {
  const [newMessage, setNewMessage] = useState('')

  const {
    createMessage,
    showAlert,
    alert,
    getMessages,
    messages,
    getMessagesSocket,
  } = useForum()

  const { community } = useCommunity()

  const navigate = useNavigate()

  const isAdmin = useAdmin(community)

  let isMember

  if (Array.isArray(community.members)) {
    isMember = useMember(community)
  }

  const { id } = useParams()

  if (!isMember && !isAdmin) {
    navigate(`/main/community/${id}`)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (newMessage === '') {
      showAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      })
      return
    }
    await createMessage(
      {
        message: newMessage,
      },
      id
    )
    setNewMessage('')
  }

  useEffect(() => {
    getMessages(id)
  }, [])

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit('join community', id)
  }, [])

  useEffect(() => {
    socket.on('message', message => {
      getMessagesSocket(message)
    })
  })

  const { msg } = alert

  return (
    <section className="flex flex-col items-center">
      <div className="normal-box max-w-5xl">
        <div className="lg:flex lg:justify-center">
          <h1 className="text-center uppercase text-zinc-600 font-black text-6xl">
            Foro
          </h1>
        </div>
        <div className="flex flex-col gap-4 mt-5 py-5 margin-auto items-center bg-gray-100 rounded-md">
          <div className="flex flex-col gap-4 mt-5 items-start text-zinc-900 text-lg">
            {messages &&
              messages.map((message, index) => (
                <ul key={index}>
                  <span className="font-bold text-accent text-xl">
                    {message.user.name}
                  </span>{' '}
                  : {message.message}
                </ul>
              ))}
          </div>
        </div>

        <form
          className="flex flex-col items-center mt-10 w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row justify-center gap-3 w-full">
            <label className="label" htmlFor="message"></label>
            <input
              id="message"
              type="text"
              placeholder="Mensaje"
              className="custom-input"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
            />
            <button
              className="btn btn-accent max-w-xs rounded-xl text-lg"
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
      {msg && <Alert alert={alert} />}
    </section>
  )
}

export default Foro
