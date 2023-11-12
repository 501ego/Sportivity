import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient'

const CommunityContext = createContext()

const CommunityProvider = ({ children }) => {
  const [communities, setCommunities] = useState([])
  const [alert, setAlert] = useState({})

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
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      })
    }
  }

  return (
    <CommunityContext.Provider
      value={{
        communities,
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
