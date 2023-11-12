import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axiosClient from '../config/axiosClient'
import Alert from '../components/Alert'

const NewPassword = () => {
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [passwordModified, setPasswordModified] = useState(false)
  const [tokenValid, setTokenValid] = useState(false)
  const [alert, setAlert] = useState({})

  const { token } = useParams()

  useEffect(() => {
    const checkToken = async () => {
      try {
        const { data } = await axiosClient.get(`/account/checktoken/${token}`)
        setTokenValid(true)
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        })
      }
    }
    checkToken()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    if ([password, password2].includes('')) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      })
      return
    }
    if (password.length < 8) {
      setAlert({
        msg: 'La contraseña es muy corta, debe tener mínimo 8 caracteres',
        error: true,
      })
      return
    }

    if (password !== password2) {
      setAlert({
        msg: 'Las contraseñas no coinciden',
        error: true,
      })
      return
    }

    try {
      const url = `/account/checktoken/${token}`
      const { data } = await axiosClient.post(url, { password })
      setAlert({
        msg: data.msg,
        error: false,
      })
      setPasswordModified(true)
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      })
    }
  }

  return (
    <section className="screen-center">
      <div className="normal-box">
        <h1 className="text-sky-600 font-black text-5xl text-center mb-2">
          Restablece tu Password
        </h1>

        {alert && <Alert alert={alert} />}

        {tokenValid &&
          (passwordModified ? (
            <button type="submit" className="custom-auth-button mt-5">
              <Link className="color-text" to="/">
                Inicia Sesión
              </Link>
            </button>
          ) : (
            <form className="" onSubmit={handleSubmit}>
              <div className="my-5">
                <label className="custom-input-label" htmlFor="password">
                  <span className="custom-input-span">Nueva contraseña</span>
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Escribe tu nueva contraseña"
                  className="custom-input"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="my-5">
                <label className="custom-input-label" htmlFor="password2">
                  <span className="custom-input-span">Nueva contraseña</span>
                </label>
                <input
                  id="password2"
                  type="password"
                  placeholder="Confirma tu nueva contraseña"
                  className="custom-input"
                  value={password2}
                  onChange={e => setPassword2(e.target.value)}
                />
              </div>
              <button type="submit" className="custom-auth-button">
                'Crear nueva contraseña'
              </button>
            </form>
          ))}
      </div>
    </section>
  )
}

export default NewPassword
