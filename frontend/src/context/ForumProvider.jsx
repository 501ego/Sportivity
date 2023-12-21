import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axiosClient'
import io from 'socket.io-client'

let socket

const ForumContext = createContext()

const ForumProvider = ({ children }) => {

	const [messages, setMessages] = useState([])
	const [alert, setAlert] = useState({})
	const [loading, setLoading] = useState(true)


	const showAlert = alert => {
		setAlert(alert)
		setTimeout(() => {
			setAlert({})
		}, 3000)
	}

	const createMessage = async (message, id) => {

		try {
			const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const config = {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
			const { data } = await axiosClient.post(`/forum/${id}`, message, config)
			
			setAlert({
				msg: data.msg,
				error: false,
			})
			setTimeout(() => {
				setAlert({})
			}, 3000)
			
			socket.emit('new message', data)

		} catch (error) {
			setAlert({
				msg: error.response.data.msg,
				error: true,
			})
			setTimeout(() => {
				setAlert({})
			}, 3000)
		}

		
	}

	const getMessages = async id => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				return
			}
			const config = {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
			const { data } = await axiosClient.get(`/forum/${id}`, config)

			setMessages(data)
			setLoading(false)
		} catch (error) {
			setAlert({
				msg: error.response.data.msg,
				error: true,
			})
			setTimeout(() => {
				setAlert({})
			}, 3000)
		}
	}
	
	useEffect(() => {
		socket = io(import.meta.env.VITE_BACKEND_URL)
	}, [])

	const getMessagesSocket = (message) => {
		let messagesUpdated = [...messages]
		messagesUpdated = [...messagesUpdated, message]
		setMessages(messagesUpdated)

	}

	return (
		<ForumContext.Provider
			value={{
				createMessage,
				showAlert,
				alert,
				messages,
				getMessagesSocket,
				getMessages,
			}}
		>
			{children}
		</ForumContext.Provider>
	)

}

export{ ForumProvider }
export default ForumContext