import useAuth from './useAuth'

const useMember = community => {
  const { auth } = useAuth()

  return community.members.some(member => member === auth._id)
}

export default useMember
