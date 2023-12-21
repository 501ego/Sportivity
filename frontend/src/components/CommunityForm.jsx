/**
 * Componente CommunityForm
 *
 * Este componente es un formulario para la creación de comunidades en la aplicación.
 *
 * Estado:
 * - selectedActivity: Almacena la actividad seleccionada para la comunidad.
 * - name: Almacena el nombre de la comunidad.
 * - description: Almacena la descripción de la comunidad.
 * - rules: Almacena las reglas de la comunidad.
 * - commune: Almacena la ubicación (comuna) seleccionada.
 *
 * Hooks:
 * - useState: Maneja el estado local del formulario.
 * - useActivity: Hook personalizado para obtener la lista de actividades disponibles.
 * - useCommunity: Hook personalizado para manejar la creación de una nueva comunidad y mostrar alertas.
 *
 * Funcionalidades:
 * - Permite al usuario introducir y enviar los datos necesarios para crear una nueva comunidad.
 * - Utiliza el hook useCommunity para enviar los datos a la API y manejar el estado de las alertas.
 * - Muestra un mensaje de error si se intenta enviar el formulario con campos vacíos.
 * - Limpia los campos después de enviar el formulario con éxito.
 *
 * JSX:
 * - El formulario contiene campos para el nombre, descripción, reglas, actividad y ubicación de la comunidad.
 * - Incluye un input para subir archivos, aunque no parece estar implementado completamente.
 * - Muestra una alerta si hay un mensaje en el estado de alerta.
 *
 * Estilos:
 * - Utiliza clases de Tailwind CSS para estilizar los inputs, textarea, select, y botones.
 *
 * Notas:
 * - Los datos de las comunas se obtienen de un archivo JSON local.
 * - No hay manejo actual para la carga de archivos, aunque se incluye un input para ello.
 */

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useActivity from '../hooks/useActivity'
import Alert from './Alert.jsx'
import useCommunity from '../hooks/useCommunity.jsx'
import communesData from '../utilities/communes.json'

const CommunityForm = () => {
  const [selectedActivity, setSelectedActivity] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [rules, setRules] = useState('')
  const { activities } = useActivity()
  const [commune, setCommune] = useState('')

  const { newCommunity, showAlert, alert } = useCommunity()

  const handleSubmit = async e => {
    e.preventDefault()
    if ([selectedActivity, name, description, rules].includes('')) {
      showAlert({
        msg: 'Todos los campos son obligatorios',
        error: true,
      })
      return
    }
    await newCommunity({
      activity: selectedActivity,
      name,
      description,
      rules,
      location: commune,
    })

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
          Registrar comunidad
        </button>
      </form>
      {msg && <Alert alert={alert} />}
    </article>
  )
}
export default CommunityForm
