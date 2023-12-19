import useAuth from './useAuth'

const useAdmin = community => {
  const { auth } = useAuth()

  return (
    community.admin === auth._id ||
    community.admin === auth.name + ' ' + auth.lastName
  )
}

export default useAdmin
