/**
 * EventContext y EventProvider en React
 *
 * Estos componentes proporcionan un contexto para gestionar y acceder al estado relacionado con los eventos.
 *
 * EventContext:
 * - Un contexto de React creado usando createContext().
 * - Permite que los componentes consuman y utilicen información sobre eventos.
 *
 * EventProvider:
 * - Un componente proveedor que encapsula los componentes hijos y les proporciona el contexto.
 * - Maneja varios estados relacionados con eventos, como 'events', 'event', 'alert', etc.
 *
 * Funcionalidades y Características:
 * - Carga la lista de eventos al montar el componente.
 * - Provee funciones para crear, editar, eliminar, obtener y participar en eventos.
 * - Maneja un estado de 'alert' para proporcionar feedback al usuario.
 * - Utiliza axiosClient para realizar solicitudes HTTP a la API y gestionar los datos.
 * - Utiliza 'useNavigate' de 'react-router-dom' para la navegación.
 *
 * Uso:
 * - EventProvider debe envolver los componentes que necesitan acceso al estado y las operaciones relacionadas con los eventos.
 * - Los componentes hijos pueden acceder a los eventos y realizar operaciones relacionadas utilizando el hook useContext con EventContext.
 *
 * Notas:
 * - Este patrón facilita la centralización y el manejo del estado relacionado con los eventos, evitando el prop drilling.
 * - Es importante garantizar que los tokens de autenticación y la información de los eventos se manejen de manera segura.
 */

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
      console.log(data)
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
