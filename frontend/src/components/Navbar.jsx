import { Link } from 'react-router-dom'

const NavBar = () => {
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
          <li>
            <Link to="upgrade-user ">Validar Usuario</Link>
          </li>
          <li>
            <Link to="register-community">Crear Comunidad</Link>
          </li>
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
        <button className="btn btn-ghost btn-circle">
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
        </button>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="../../../public/img/user.png" />
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
              <a className="text-accent">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavBar
