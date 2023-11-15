import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert.jsx'
import axiosClient from '../config/axiosClient.jsx'
import { useNavigate } from 'react-router-dom'

const UpgradeUser = () => {
  const [rut, setRut] = useState('')
  const [profession, setProfession] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState({})

  const Navigate = useNavigate()

  const handleSumbit = async e => {
    e.preventDefault()
    if ([rut, profession, password].includes('')) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      })
      return
    }

    const dataAdmin = {
      rut,
      profession,
      password,
    }

    setAlert({})

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }

      const config = {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axiosClient.put(
        `/users/validateuser/`,
        dataAdmin,
        config
      )
      setAlert({
        msg: data.msg,
        error: false,
      })

      Navigate('/main')
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
        <h1 className="text-center text-accent font-black text-5xl mt-2 mb-5">
          Haste Admin y crea tus comunidades
        </h1>
        <form className="p-5" onSubmit={handleSumbit}>
          <div className="form-control">
            <label className="custom-input-label" htmlFor="rut">
              <span className="custom-input-span">Rut</span>
            </label>
            <input
              id="rut"
              type="text"
              placeholder="Ingresa tu rut"
              className="custom-input"
              value={rut}
              onChange={e => setRut(e.target.value)}
            />
          </div>
          <div>
            <label className="custom-input-label" htmlFor="profession">
              <span className="custom-input-span">Profesión</span>
            </label>
            <input
              id="profession"
              type="text"
              placeholder="Ingresa tu profesión"
              className="custom-input"
              value={profession}
              onChange={e => setProfession(e.target.value)}
            />
          </div>
          <div className="">
            <label className="custom-input-label" htmlFor="password">
              <span className="custom-input-span">Contraseña</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña de registro"
              className="custom-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="custom-auth-button">
            Registrarse
          </button>
        </form>
        <Link className="custom-link" to="/">
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
      </article>
      {msg && <Alert alert={alert} />}
    </section>
  )
}

export default UpgradeUser
