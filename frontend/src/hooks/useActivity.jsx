import { useContext } from 'react'
import ActivityContext from '../context/ActivityProvider'

const useActivity = () => useContext(ActivityContext)

export default useActivity
