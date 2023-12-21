import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Alert from './Alert.jsx'
import useCommunity from '../hooks/useCommunity.jsx'

const EditCommunityForm = () => {

	const [id, setId] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [rules, setRules] = useState('')

  const params = useParams()

  const { editCommunity, showAlert, alert, community } = useCommunity()

  useEffect(() => {
		setId(params.id)
		setName(community.name)
		setDescription(community.description)
		setRules(community.rules)
  }, [community])

  const handleSubmit = async e => {
    e.preventDefault()
    if ([name, description, rules].includes('')) {
      showAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      })
      return
    }
    await editCommunity({
      id,
      name,
      description,
      rules,
    })

    setId(null)
    setName('')
    setDescription('')
    setRules('')
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
        <button type="submit" className="custom-auth-button mt-2">
          Actualizar comunidad
        </button>
      </form>
      {msg && <Alert alert={alert} />}
    </article>
	)
}

export default EditCommunityForm
