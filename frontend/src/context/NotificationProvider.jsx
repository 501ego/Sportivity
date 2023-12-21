import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient'
import useCommunity from '../hooks/useCommunity'

const NotificationContext = createContext()

const NotificationProvider = ({ children }) => {
  const { myCommunities } = useCommunity()

  const [notifications, setNotifications] = useState([])

  // useEffect(() => {
  //   const getNotifications = async () => {
  //     try {
  //       const token = localStorage.getItem('token')
  //       if (!token) {
  //         return
  //       }
  //       const config = {
  //         headers: {
  //           'content-type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //       const { data } = await axiosClient.get(
  //         `/communities/getrequests`,
  //         config
  //       )
  //       console.log(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getNotifications()
  // }, [])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export { NotificationProvider }
export default NotificationContext
