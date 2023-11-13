import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient'

const ActivityContext = createContext()

const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    const viewActivities = async () => {
      try {
        const { data } = await axiosClient.get('/activities/view-activities')
        setActivities(data)
      } catch (error) {
        console.log(error)
      }
    }

    viewActivities()
  }, [])

  return (
    <ActivityContext.Provider
      value={{
        activities,
      }}
    >
      {children}
    </ActivityContext.Provider>
  )
}

export { ActivityProvider }
export default ActivityContext
