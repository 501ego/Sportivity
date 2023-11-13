import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient'

const CommunityContext = createContext()

const CommunityProvider = ({ children }) => {
  const [communities, setCommunities] = useState([])
  const [myCommunities, setMyCommunities] = useState([])
  const [alert, setAlert] = useState({})

  const navigate = useNavigate()

  const showAlert = alert => {
    setAlert(alert)
    setTimeout(() => {
      setAlert({})
    }, 3000)
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
      navigate('/main-page')
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

  return (
    <CommunityContext.Provider
      value={{
        communities,
        myCommunities,
        newCommunity,
        showAlert,
        alert,
      }}
    >
      {children}
    </CommunityContext.Provider>
  )
}

export { CommunityProvider }
export default CommunityContext
