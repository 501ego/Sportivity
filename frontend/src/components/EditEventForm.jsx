import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Alert from './Alert.jsx'
import useEvent from '../hooks/useEvent.jsx'

const EditEventForm = () => {

	const [id, setId] = useState(null)
	const [name, setName] = useState('')
	const [date, setDate] = useState('')
	const [description, setDescription] = useState('')
	
	const params = useParams()

	const { editEvent, showAlert, alert, event } = useEvent()

	useEffect(() => {
		setId(params.eventId)
		setName(event.name)
		setDate(event.date?.split('T')[0])
		setDescription(event.description)
	}, [event])

	const handleSubmit = async e => {
		e.preventDefault()
		if ([name, date, description].includes('')) {
			showAlert({
				msg: 'Todos los campos son obligatorios',
				error: true,
			})
			return
		}
		await editEvent({
			id,
			name,
			date,
			description,
		}, event.community._id)

		setId(null)
		setName('')
		setDate('')
		setDescription('')
	}

	const { msg } = alert

	return (
		<article>
      <form className="p-5" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label" htmlFor="name">
            <span className="custom-input-label">Nombre del evento</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Ingresa el nombre del evento"
            className="custom-input"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
				<div className="mb-5">
            <label className="label" htmlFor="date">
              <span className="custom-input-label">Fecha</span>
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
            placeholder="Ingresa la descripción del evento"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="custom-auth-button mt-2">
          Actualizar Evento
        </button>
      </form>
      {msg && <Alert alert={alert} />}
    </article>
	)
}

export default EditEventForm
