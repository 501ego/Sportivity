import { useContext } from "react"
import ForumContext from "../context/ForumProvider"

const useForum = () => useContext(ForumContext)

export default useForum
