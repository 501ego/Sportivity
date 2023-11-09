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
        msg: 'El password es muy corto, debe tener mínimo 8 caracteres',
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
    <section className="container mx-auto max-w-5xl">
      <article className="my-10 bg-white shadow-lg rounded-lg p-5">
        <h1 className="text-center text-sky-600 font-black text-6xl">
          Registro
        </h1>
        {msg && <Alert alert={alert} />}
        <form className="p-10" onSubmit={handleSumbit}>
          <div className="mb-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="userName"
            >
              Nombre de Usuario
            </label>
            <input
              id="userName"
              type="text"
              placeholder="Tu nombre de usuario"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              id="name"
              type="text"
              placeholder="Tu nombre"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="lastName"
            >
              Apellido
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Tu apellido"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <select
              id="country"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
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
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
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
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
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
          <div className="mb-5">
            <select
              id="commune"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
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
          <div className="mb-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email de registro"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <div className="my-5">
              <label
                className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="Contraseña de registro"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="my-5">
              <label
                className="uppercase text-gray-600 block text-xl font-bold"
                htmlFor="password2"
              >
                Confirmar Contraseña
              </label>
              <input
                id="password2"
                type="password"
                placeholder="Confirmar contraseña de registro"
                className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                value={password2}
                onChange={e => setPassword2(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          >
            Registrarse
          </button>
        </form>
      </article>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/forgotmypass"
        >
          Olvide mi Password
        </Link>
      </nav>
    </section>
  )
}

export default Register
