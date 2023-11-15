import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient'

const CommunityContext = createContext()

const CommunityProvider = ({ children }) => {
  const [communities, setCommunities] = useState([])
  const [myCommunities, setMyCommunities] = useState([])
  const [community, setCommunity] = useState({})
  const [alert, setAlert] = useState({})

  const navigate = useNavigate()

  const showAlert = alert => {
    setAlert(alert)
    setTimeout(() => {
      setAlert({})
    }, 3000)
  }

  const submitCommmunity = async community => {
    if (community._id) {
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
        `/communities/${community._id}`,
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
      navigate('main')
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
  }

  return (
    <CommunityContext.Provider
      value={{
        communities,
        myCommunities,
        submitCommmunity,
        getCommunity,
        showAlert,
        community,
        alert,
      }}
    >
      {children}
    </CommunityContext.Provider>
  )
}

export { CommunityProvider }
export default CommunityContext
