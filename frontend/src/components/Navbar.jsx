import useCommunity from '../hooks/useCommunity'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import useEvent from '../hooks/useEvent'

const NavBar = () => {
  const { requests, loading, addMember } = useCommunity()
  const { auth } = useAuth()

  if (loading) {
    return <p>Loading...</p>
  }

  const handleAccept = async request => {
    if (request.communityId) {
      await addMember(request.communityId, request.userId)
    }
  }

  const handleLogout = async () => {
    localStorage.removeItem('token')
  }

  return (
    <div className="navbar bg-zinc-900">
      <div className="dropdown">
        <label tabIndex={0}>
          <div className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </div>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {!auth.isValidated && (
            <li>
              <Link to="upgrade-user ">Validar Usuario</Link>
            </li>
          )}

          {auth.isValidated && (
            <li>
              <Link to="register-community">Crear Comunidad</Link>
            </li>
          )}

          <li>
            <Link to="my-communities">Mis Comunidades</Link>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Link className="btn btn-ghost text-accent normal-case text-xl" to="">
          Inicio
        </Link>
      </div>

      <div className="flex-none">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu absolute right-0 shadow bg-base-100 rounded-box w-[300px]"
          >
            {requests.length === 0 ? (
              <p>No hay notificaciones</p>
            ) : (
              requests.map((request, index) => {
                return (
                  <li key={index}>
                    <div className="flex flex-row items-center p-2">
                      <div className="flex flex-col items-start gap-2">
                        <button
                          className="btn-accent btn-xs rounded-md p-2 items-center flex w-full justify-center"
                          onClick={() => handleAccept(request)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <button className="bg-red-500 btn-xs rounded-md p-2 items-center flex text-slate-100 hover:bg-red-600 w-full justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="flex-col flex items-start w-full">
                        <p className="ml-1 w-full flex">
                          {request.name} desea unirse a tu comunidad{' '}
                          {request.communityName}
                        </p>
                      </div>
                    </div>
                  </li>
                )
              })
            )}
          </ul>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="../../../public/img/user.png" alt="User" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 "
          >
            <li>
              <a className="justify-between text-accent">
                Perfil
                <span className="badge text-accent">New</span>
              </a>
            </li>
            <li>
              <a className="text-accent">Configuración</a>
            </li>
            <li>
              <Link to="/" onClick={handleLogout} className="text-accent">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavBar
