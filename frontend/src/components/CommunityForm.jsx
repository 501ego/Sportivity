import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useActivity from '../hooks/useActivity'
import Alert from './Alert.jsx'
import useCommunity from '../hooks/useCommunity.jsx'
import communesData from '../utilities/communes.json'

const CommunityForm = () => {
  const [id, setId] = useState(null)
  const [selectedActivity, setSelectedActivity] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [rules, setRules] = useState('')
  const { activities } = useActivity()
  const [commune, setCommune] = useState('')

  const params = useParams()

  const { submitCommmunity, showAlert, alert, community } = useCommunity()

  useEffect(() => {
    if (params.id) {
      setId(params.id)
      setName(community.name)
      setDescription(community.description)
      setRules(community.rules)
      setSelectedActivity(community.activity)
      setCommune(community.location)
    }
  }, [params])

  const handleSubmit = async e => {
    e.preventDefault()
    if ([selectedActivity, name, description, rules].includes('')) {
      showAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      })
      return
    }
    await submitCommmunity({
      id,
      activity: selectedActivity,
      name,
      description,
      rules,
      location: commune,
    })

    setId(null)
    setName('')
    setDescription('')
    setRules('')
    setSelectedActivity('')
    setCommune('')
  }

  const { msg } = alert

  return (
    <article>
      <form className="p-5" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label" htmlFor="name">
            <span className="custom-input-label">Nombre de la comunidad</span>
          </label>
          <input
            id="communityName"
            type="text"
            placeholder="Ingresa el nombre de la comunidad"
            className="custom-input"
            value={name}
            onChange={e => setName(e.target.value)}
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
        <div className="form-control" htmlFor="rules">
          <label className="label">
            <span className="custom-input-label">Reglas</span>
          </label>
          <textarea
            id="rules"
            className="textarea textarea-bordered h-24 bg-gray-50 text-lg"
            placeholder="Ingresa las reglas de la comunidad"
            value={rules}
            onChange={e => setRules(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="label">
            <span className="custom-input-label">Actividad</span>
          </label>
          <select
            id="activity"
            className="custom-select"
            value={selectedActivity ? selectedActivity : 'selectActivity'}
            onChange={e => setSelectedActivity(e.target.value)}
          >
            <option value="selectActivity" disabled hidden>
              Seleccione una actividad
            </option>
            {activities.map(Activity => (
              <option key={Activity._id} value={Activity.name}>
                {Activity.name}
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
        <input
          type="file"
          className="file-input file-input-ghost w-full mb-5"
        />
        <button type="submit" className="custom-auth-button">
          {id ? 'Actualizar comunidad' : 'Registrar comunidad'}
        </button>
      </form>
      {msg && <Alert alert={alert} />}
    </article>
  )
}
export default CommunityForm
