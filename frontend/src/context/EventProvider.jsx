import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axiosClient'

const EventContext = createContext()

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([])
  const [alert, setAlert] = useState({})

  const showAlert = alert => {
    setAlert(alert)
    setTimeout(() => {
      setAlert({})
    }, 3000)
  }

  const newEvent = async (event, id) => {
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

      const { data } = await axiosClient.post(`/events/${id}`, event, config)
      setEvents([...events, data])
      setAlert({
        msg: data.msg,
        error: false,
      })
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      })
    }
  }

  return (
    <EventContext.Provider
      value={{
        newEvent,
        showAlert,
        alert,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}

export { EventProvider }
export default EventContext
