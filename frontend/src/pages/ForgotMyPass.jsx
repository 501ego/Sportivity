import { useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../config/axiosClient'
import Alert from '../components/Alert'

const ForgotMyPass = () => {
  const [email, setEmail] = useState('')
  const [alert, setAlert] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    if (email === '') {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      })
      return
    }

    try {
      const { data } = await axiosClient.post(`/account/resetpassword`, {
        email,
      })
      setAlert({
        msg: data.msg,
        error: false,
      })
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
      <article className="normal-box">
        <h1 className="text-accent font-black text-5xl text-center">
          Recupera tu contraseña
        </h1>

        {msg && <Alert alert={alert} />}

        <form className="p-3" onSubmit={handleSubmit}>
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
          <button type="submit" className="custom-auth-button">
            Restablecer contraseña{' '}
          </button>
        </form>
        <nav className="lg:flex lg:justify-between mb-2">
          <Link className="custom-link" to="/">
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>

          <Link className="custom-link" to="/register">
            ¿No tientes una cuenta? Regístrate
          </Link>
        </nav>
      </article>
    </section>
  )
}

export default ForgotMyPass
