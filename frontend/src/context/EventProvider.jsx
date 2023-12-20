import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient'

const EventContext = createContext()

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([])
  const [event, setEvent] = useState({})
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

  const getEvent = async id => {
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

      const { data } = await axiosClient.get(`/events/getevent/${id}`, config)
      setEvent(data)
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

  const participateEvent = async (id, eventId) => {
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

      const { data } = await axiosClient.put(
        `/events/participate/${id}`,
        { eventId },
        config
      )

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

  const editEvent = async (event, communityId) => {
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

      const { data } = await axiosClient.put(
        `/events/edit/${communityId}/${event.id}`,
        event,
        config
      )

      const eventEdited = events.map(eventState =>
        eventState._id === data._id ? data : eventState
      )

      setEvents(eventEdited)

      setAlert({
        msg: data.msg,
        error: false,
      })
      setTimeout(() => {
        setAlert({})
        navigate(`/main/community/${communityId}/events`)
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

  const deleteEvent = async (id, eventId) => {
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

      const { data } = await axiosClient.delete(
        `/events/delete/${id}/${eventId}`,
        config
      )

      const eventsDeleted = events.filter(event => event._id !== eventId)
      setEvents(eventsDeleted)

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

  const exitFromEvent = async (id, eventId) => {
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

      const { data } = await axiosClient.put(
        `/events/exit/${id}/${eventId}`,
        {},
        config
      )

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

  return (
    <EventContext.Provider
      value={{
        events,
        newEvent,
        showAlert,
        alert,
        getEvent,
        event,
        participateEvent,
        editEvent,
        deleteEvent,
        exitFromEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}

export { EventProvider }
export default EventContext
