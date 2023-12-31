/**
 * CommunityContext y CommunityProvider en React
 *
 * Estos componentes proporcionan un contexto para gestionar y acceder al estado relacionado con las comunidades.
 *
 * CommunityContext:
 * - Un contexto de React creado usando createContext().
 * - Permite que los componentes consuman y utilicen información sobre comunidades.
 *
 * CommunityProvider:
 * - Un componente proveedor que encapsula los componentes hijos y les proporciona el contexto.
 * - Maneja varios estados relacionados con comunidades, como 'communities', 'myCommunities', 'community', 'alert', 'requests', y 'loading'.
 *
 * Funcionalidades y Características:
 * - Carga la lista de comunidades y comunidades del usuario al montar el componente.
 * - Provee funciones para editar, crear, eliminar, obtener y buscar comunidades.
 * - Maneja la funcionalidad para enviar solicitudes de membresía y agregar miembros.
 * - Utiliza axiosClient para realizar solicitudes HTTP a la API y gestionar los datos.
 * - Maneja un estado de 'alert' para proporcionar feedback al usuario.
 * - Utiliza 'useNavigate' de 'react-router-dom' para la navegación.
 *
 * Uso:
 * - CommunityProvider debe envolver los componentes que necesitan acceso al estado y las operaciones relacionadas con las comunidades.
 * - Los componentes hijos pueden acceder a las comunidades y realizar operaciones relacionadas utilizando el hook useContext con CommunityContext.
 *
 * Notas:
 * - Este patrón facilita la centralización y el manejo del estado relacionado con las comunidades, evitando el prop drilling.
 * - Es importante garantizar que los tokens de autenticación y la información de las comunidades se manejen de manera segura.
 */

import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient'

const CommunityContext = createContext()

const CommunityProvider = ({ children }) => {
  const [communities, setCommunities] = useState([])
  const [myCommunities, setMyCommunities] = useState([])
  const [community, setCommunity] = useState({})
  const [alert, setAlert] = useState({})
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const showAlert = alert => {
    setAlert(alert)
    setTimeout(() => {
      setAlert({})
    }, 3000)
  }

  /*const submitCommmunity = async community => {
    if (community.id) {
      await editCommunity(community)
    } else {
      await newCommunity(community)
    }
  }*/

  const editCommunity = async community => {
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
        `/communities/${community.id}`,
        community,
        config
      )
      console.log(data)

      const communityEdited = communities.map(communityState =>
        communityState._id === data._id ? data : communityState
      )
      setCommunities(communityEdited)

      setAlert({
        msg: data.msg,
        error: false,
      })
      setTimeout(() => {
        setAlert({})
        navigate('/main')
      }, 3000)
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      })
    }
  }

  const newCommunity = async community => {
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
      const { data } = await axiosClient.post('/communities', community, config)
      setCommunities([...communities, data])
      setAlert({
        msg: data.msg,
        error: false,
      })
      navigate('main')
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      })
    }
  }

  const deleteCommunity = async id => {
    console.log(id)
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
      const { data } = await axiosClient.delete(`/communities/${id}`, config)
      const communityDeleted = communities.filter(
        community => community._id !== id
      )
      setCommunities(communityDeleted)
      setAlert({
        msg: data.msg,
        error: false,
      })
      setTimeout(() => {
        setAlert({})
        navigate('/communities')
      }, 3000)
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      })
    }
  }

  useEffect(() => {
    const getCommunities = async () => {
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
          '/communities/getcommunites',
          config
        )
        setCommunities(data)
      } catch (error) {
        console.log(error)
      }
    }
    getCommunities()
  }, [])

  useEffect(() => {
    const getMyCommunities = async () => {
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
          '/communities/getmycommunites',
          config
        )
        setMyCommunities(data)
      } catch (error) {
        console.log(error)
      }
    }
    getMyCommunities()
  }, [])

  const getCommunity = async id => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }
      const config = {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axiosClient.get(
        `/communities/community/${id}`,
        config
      )
      setCommunity(data)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const searchCommunity = async search => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('No se encontró el token')
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await axiosClient.get(
        `/communities/search/${search}`,
        config
      )
      setCommunities(data)
    } catch (error) {
      if (error.response && error.response.status === 404) {
        try {
          const token = localStorage.getItem('token')
          if (!token) {
            return
          }
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
          const { data } = await axiosClient.get(
            '/communities/getcommunites',
            config
          )
          setCommunities(data)
        } catch (error) {
          console.error('Error al obtener todas las comunidades:', error)
        }
      } else {
        console.error('Error al realizar la búsqueda:', error)
      }
    }
  }

  const sendRequest = async id => {
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
        `/communities/sendrequest/${id}`,
        config
      )

      setAlert({
        msg: data.msg,
        error: false,
      })
      setTimeout(() => {
        setAlert({})
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

  useEffect(() => {
    const getRequests = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setLoading(false)
          return
        }
        const config = {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
        const { data } = await axiosClient.get(
          `/communities/getrequests`,
          config
        )
        setRequests(data)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    getRequests()
  }, [])

  const addMember = async (id, user) => {
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
        `communities/addmember/${id}`,
        { user },
        config
      )

      setAlert({
        msg: data.msg,
        error: false,
      })
      setTimeout(() => {
        setAlert({})
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
    <CommunityContext.Provider
      value={{
        communities,
        myCommunities,
        editCommunity,
        newCommunity,
        deleteCommunity,
        getCommunity,
        showAlert,
        searchCommunity,
        community,
        loading,
        alert,
        sendRequest,
        requests,
        addMember,
      }}
    >
      {children}
    </CommunityContext.Provider>
  )
}

export { CommunityProvider }
export default CommunityContext
