import useAuth from './useAuth'

const useMember = data => {
  const { auth } = useAuth()

  return data.members.some(member => member === auth._id) ||
    data.members.some(member => member._id === auth._id)
}

export default useMember
