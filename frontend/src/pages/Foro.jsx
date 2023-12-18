import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useForum from '../hooks/useForum'
import Alert from '../components/Alert'
import { io } from 'socket.io-client'

let socket

const Foro = () => {

	const [newMessage, setNewMessage] = useState('')

	const { createMessage, showAlert, alert, getMessages, messages, getMessagesSocket } = useForum()
	const { id } = useParams()

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
				message: newMessage
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
        <div className='lg:flex lg:justify-between'>
          <h1 className="text-start uppercase text-zinc-600 font-black text-6xl mt-2">
            Foro
          </h1>
        </div>

				<div className="flex flex-col gap-4 mt-5 items-center">
					{messages && messages.map((message, index) => (
						<li key={index}>{message.user.name} : {message.message}</li>
					))}
				</div>

        <form className="flex flex-col items-center mt-10"
					onSubmit={handleSubmit}
				>
          <div className="flex flex-row justify-center gap-4 mt-5">
						<label className="label" htmlFor="message">
						</label>
						<input
							id="message"
							type="text"
							placeholder="Mensaje"
							className="custom-input"
							value={newMessage}
							onChange={e => setNewMessage(e.target.value)}
						/>
            <button className="btn btn-accent max-w-xs rounded-xl text-lg"
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
