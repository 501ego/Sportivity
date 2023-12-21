import { useContext } from 'react'
import CommunityContext from '../context/CommunityProvider'

const useCommunity = () => useContext(CommunityContext)

export default useCommunity
