import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import CommunesData from '../utilities/communes.json'
import useEvent from '../hooks/useEvent'
import Alert from '../components/Alert'

const NewEvent = () => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [commune, setCommune] = useState('')

  const { newEvent, showAlert, alert } = useEvent()

  const { id } = useParams()
  const handleSumbit = async e => {
    e.preventDefault()
    if ([name, date, description, commune].includes('')) {
      showAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      })
      return
    }
    await newEvent(
      {
        name,
        date,
        description,
        location: commune,
      },
      id
    )
  }

  const { msg } = alert
  return (
    <section className="screen-center">
      <article className="normal-box">
        <h1 className="text-center text-accent font-black text-5xl mt-2 mb-5">
          Crear Evento
        </h1>
        <form className="p-5" onSubmit={handleSumbit}>
          <div>
            <label className="custom-input-label" htmlFor="name">
              <span className="custom-input-span">Nombre del evento</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Nombre del evento"
              className="custom-input"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="custom-input-label" htmlFor="date">
              <span className="custom-input-span">Fecha</span>
            </label>
            <input
              id="date"
              type="date"
              className="custom-input"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="description">
              <span className="custom-input-label">Descripción</span>
            </label>
            <textarea
              id="description"
              className="textarea textarea-bordered h-24 bg-gray-50 text-lg"
              placeholder="Ingresa la descripción de la comunidad"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
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
              {CommunesData.communes.map((communeName, index) => (
                <option key={index} value={communeName}>
                  {communeName}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="custom-auth-button">
            Crear Evento
          </button>
        </form>
      </article>
      {msg && <Alert alert={alert} />}
    </section>
  )
}

export default NewEvent
