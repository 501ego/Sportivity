import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient'

const EventContext = createContext()

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([])
  const [alert, setAlert] = useState({})
  const navigate = useNavigate()

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
      setTimeout(() => {
        setAlert({})
        navigate(`/main/community/${id}/events`)
      }, 3000)
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

  const getEvent = async (id, eventId) => {
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

      const { data } = await axiosClient.get(
        `/events/getevent/${id}/${eventId}`,
        config
      )
      setEvents(data)
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      })
    }
  }

  useEffect(() => {
    const getEvents = async () => {
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
        const { data } = await axiosClient.get(`/events/getevents`, config)
        setEvents(data)
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        })
      }
    }
    getEvents()
  }, [])

  return (
    <EventContext.Provider
      value={{
        events,
        newEvent,
        showAlert,
        alert,
        getEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}

export { EventProvider }
export default EventContext
