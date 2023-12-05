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
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const showAlert = alert => {
    setAlert(alert)
    setTimeout(() => {
      setAlert({})
    }, 3000)
  }

  const submitCommmunity = async community => {
    if (community.id) {
      await editCommunity(community)
    } else {
      await newCommunity(community)
    }
  }

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
    setLoading(true)
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
          return
        }
        const config = {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
        const { data } = await axiosClient.get(
          `/communities/getrequests/${id}`,
          config
        )
        setRequests(data)
      } catch (error) {
        console.log(error)
      }
    }
    getRequests()
  }, [])

  return (
    <CommunityContext.Provider
      value={{
        communities,
        myCommunities,
        submitCommmunity,
        getCommunity,
        showAlert,
        searchCommunity,
        community,
        loading,
        alert,
        sendRequest,
        getRequests,
      }}
    >
      {children}
    </CommunityContext.Provider>
  )
}

export { CommunityProvider }
export default CommunityContext
