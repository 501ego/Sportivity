import { useState } from 'react'
import { Link } from 'react-router-dom'
import communesData from '../utilities/communes.json'
import Alert from '../components/Alert.jsx'
import axiosClient from '../config/axiosClient.jsx'

const Register = () => {
  const [userName, setUserName] = useState('')
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')
  const [city, setCity] = useState('')
  const [commune, setCommune] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const [alert, setAlert] = useState({})

  const handleSumbit = async e => {
    // Validar que no haya campos vacios
    e.preventDefault()
    if (
      [
        userName,
        name,
        lastName,
        country,
        region,
        city,
        commune,
        email,
        password,
        password2,
      ].includes('')
    ) {
      setAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      })
      return
    }
    // Validar que el password sea igual al repetir password
    if (password !== password2) {
      setAlert({
        msg: 'Las contraseñas no coinciden',
        error: true,
      })
      return
    }

    // Validar que el password tenga al menos 8 caracteres
    if (password.length < 8) {
      setAlert({
        msg: 'La contraseña es muy corta, debe tener mínimo 8 caracteres',
        error: true,
      })
      return
    }

    // Resetear la alerta
    setAlert({})

    // Crear el usuario en la API
    try {
      const { data } = await axiosClient.post(`/users`, {
        userName,
        name,
        lastName,
        country,
        region,
        city,
        commune,
        email,
        password,
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
        <h1 className="text-center text-sky-600 font-black text-5xl mt-2 mb-5">
          Registro
        </h1>
        <form className="p-5" onSubmit={handleSumbit}>
          <div className="form-control">
            <label className="custom-input-label" htmlFor="userName">
              <span className="custom-input-span">Nombre de Usuario</span>
            </label>
            <input
              id="userName"
              type="text"
              placeholder="Tu nombre de usuario"
              className="custom-input"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label className="custom-input-label" htmlFor="name">
              <span className="custom-input-span">Nombre</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Tu nombre"
              className="custom-input"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="custom-input-label" htmlFor="lastName">
              <span className="custom-input-span">Apellido</span>
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Tu apellido"
              className="custom-input"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <select
              id="country"
              className="custom-select"
              value={country ? country : 'selectCountry'}
              onChange={e => setCountry(e.target.value)}
            >
              <option value="selectCountry" disabled hidden>
                Seleccione un país
              </option>
              {communesData.country.map((countryName, index) => (
                <option key={index} value={countryName}>
                  {countryName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <select
              id="region"
              className="custom-select"
              value={region ? region : 'selectRegion'}
              onChange={e => setRegion(e.target.value)}
            >
              <option value="selectRegion" disabled hidden>
                Seleccione una región
              </option>
              {communesData.region.map((regionName, index) => (
                <option key={index} value={regionName}>
                  {regionName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5">
            <select
              id="city"
              className="custom-select"
              value={city ? city : 'selectCity'}
              onChange={e => setCity(e.target.value)}
            >
              <option value="selectCity" disabled hidden>
                Seleccione una ciudad
              </option>
              {communesData.city.map((cityName, index) => (
                <option key={index} value={cityName}>
                  {cityName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-1">
            <select
              id="commune"
              className="custom-select"
              value={commune ? commune : 'selectCommune'}
              onChange={e => setCommune(e.target.value)}
            >
              <option value="selectCommune" disabled hidden>
                Seleccione una comuna
              </option>
              {communesData.communes.map((communeName, index) => (
                <option key={index} value={communeName}>
                  {communeName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-1">
            <label className="custom-input-label" htmlFor="email">
              <span className="custom-input-span">Email</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email de registro"
              className="custom-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
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
            <div className="mb-5">
              <label className="custom-input-label" htmlFor="password2">
                <span className="custom-input-span">Confirmar contraseña</span>
              </label>
              <input
                id="password2"
                type="password"
                placeholder="Confirmar contraseña de registro"
                className="custom-input"
                value={password2}
                onChange={e => setPassword2(e.target.value)}
              />
            </div>
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

export default Register
