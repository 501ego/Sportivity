import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Navbar from '../components/Navbar'

const SecureRoute = () => {
  const { auth, loading } = useAuth()
  if (loading) return 'Loading...'


  return (
    <>
      {auth._id ? (
        <>
          <header>
            <Navbar />
          </header>
          <main>
            <Outlet />
          </main>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  )
}

export default SecureRoute
