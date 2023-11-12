import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import axiosClient from '../config/axiosClient'
import useAuth from '../hooks/useAuth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({})
  const { setAuth } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    if ([email, password].includes('')) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      })
      return
    }

    try {
      const { data } = await axiosClient.post('/account/login', {
        email,
        password,
      })
      setAlert({})
      localStorage.setItem('token', data.token)
      setAuth(data)
      setEmail('')
      setPassword('')
      navigate('/main-page')
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      })
    }
  }

  const { msg } = alert

  return (
    <section className="screen-center">
      {msg && <Alert alert={alert} />}
      <article className="normal-box">
        <h1 className="text-center text-sky-600 font-black text-5xl mt-2 mb-5">
          Inicia sesión <br />
          <span className="text-slate-700 font-semibold text-4xl">
            Encuentra tu comunidad
          </span>
        </h1>

        <form className="p-5" onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="custom-input-label" htmlFor="email">
              <span className="custom-input-span">Email</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="custom-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label className="custom-input-label" htmlFor="password">
              <span className="custom-input-span">Password</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password de Registro"
              className="custom-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="custom-auth-button">
            {' '}
            Iniciar sesión
          </button>
        </form>
        <nav className="lg:flex lg:justify-between mb-2">
          <Link className="custom-link" to="/register">
            ¿No tientes una cuenta? Regístrate
          </Link>{' '}
          <Link className="custom-link" to="/forgotmypass">
            Olvidé mi Password
          </Link>
        </nav>
      </article>
    </section>
  )
}

export default Login
