import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  const [termsAccepted, setTermsAccepted] = useState(false)

  const [alert, setAlert] = useState({})

  const Navigate = useNavigate()

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
      ].includes('') ||
      !termsAccepted
    ) {
      setAlert({
        msg: 'Todos los campos son obligatorios y debes aceptar los términos y condiciones',
        error: true,
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
      setUserName('')
      setName('')
      setLastName('')
      setCountry('')
      setRegion('')
      setCity('')
      setCommune('')
      setEmail('')
      setPassword('')
      setPassword2('')

      setTimeout(() => {
        Navigate('/')
      }, 3000)
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

          <div className="form-control mb-3 items-center">
            <label className="custom-input-label" htmlFor="terms">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={e => setTermsAccepted(e.target.checked)}
                className="checkbox"
              />
              <button
                className=""
                onClick={() =>
                  document.getElementById('my_modal_1').showModal()
                }
              >
                <span className="custom-input-span">
                  {' '}
                  Acepto los términos y condiciones
                </span>
              </button>
            </label>
          </div>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Términos y condiciones</h3>
              <article className="py-4">
                <h2>1. Introducción</h2>
                <p>
                  Bienvenido a Sportify. Estos Términos y Condiciones rigen el
                  uso de nuestra aplicación y sitio web, que facilitan la
                  creación y participación en comunidades centradas en la
                  actividad física y el deporte.
                </p>

                <h2>2. Aceptación de los Términos</h2>
                <p>
                  Al usar Sportify, usted acepta estar vinculado por estos
                  Términos y Condiciones. Si no está de acuerdo con alguna parte
                  de los términos, no tiene permiso para acceder a nuestro
                  servicio.
                </p>

                <h2>3. Uso del Servicio</h2>
                <h3>3.1 Conducta del Usuario</h3>
                <p>
                  Todos los usuarios deben mantener una conducta respetuosa y
                  positiva dentro de la aplicación. Esto incluye respetar las
                  diferentes opiniones, evitar el acoso o cualquier forma de
                  discriminación, y contribuir a un entorno inclusivo y de
                  apoyo.
                </p>
                <h3>3.2 Reglas de la Comunidad</h3>
                <p>
                  Cada comunidad puede tener sus propias reglas adicionales. Es
                  responsabilidad del usuario conocer y adherirse a estas
                  reglas.
                </p>

                <h2>4. Propiedad Intelectual</h2>
                <p>
                  Todo el contenido en Sportify, incluyendo textos, gráficos,
                  logos, iconos, imágenes y software, es propiedad de [Nombre de
                  tu Empresa] o se utiliza con permiso.
                </p>

                <h2>5. Limitación de Responsabilidad</h2>
                <p>
                  Sportify no es responsable de las interacciones entre usuarios
                  dentro o fuera de la aplicación. Aunque moderamos el
                  contenido, no podemos garantizar la precisión, integridad o
                  calidad de los contenidos publicados.
                </p>

                <h2>6. Cambios en los Términos</h2>
                <p>
                  Nos reservamos el derecho de modificar estos términos en
                  cualquier momento. Al continuar utilizando el servicio después
                  de dichos cambios, acepta estar vinculado por la versión
                  modificada de los Términos y Condiciones.
                </p>

                <h2>7. Contacto</h2>
                <p>
                  Para cualquier pregunta o comentario sobre estos términos,
                  contáctenos en contacto@sportify.com.
                </p>
                <br />
                <h2>8. Sugerencias o reclamos</h2>
                <p>
                  Peticiones de mejora o reportes de errores pueden ser enviados
                  a develop@sportify.com. Por favor, incluya información
                  suficiente para que podamos entender y reproducir el problema.
                </p>
                <br />
                <p>Fecha de Última Actualización: 20.09.2021</p>
              </article>

              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Cerrar</button>
                </form>
              </div>
            </div>
          </dialog>
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
