import { useContext } from 'react'
import EventContext from '../context/EventProvider'

const useEvent = () => {
  return useContext(EventContext)
}

export default useEvent
