/**
 * ActivityContext y ActivityProvider en React
 *
 * Este conjunto de componentes proporciona un contexto para gestionar y acceder a la lista de actividades.
 *
 * ActivityContext:
 * - Un contexto de React creado usando createContext().
 * - Permite que los componentes anidados consuman la información de las actividades.
 *
 * ActivityProvider:
 * - Un componente proveedor que envuelve los componentes hijos y les proporciona el contexto.
 * - Maneja el estado 'activities' que almacena una lista de actividades.
 * - Utiliza el hook useEffect para cargar las actividades desde la API al montar el componente.
 *
 * Funciones y Características:
 * - viewActivities: Una función asíncrona que obtiene las actividades de la API y actualiza el estado.
 * - axiosClient: Utilizado para realizar solicitudes HTTP a la API y obtener las actividades.
 * - El estado 'activities' se inicializa como un arreglo vacío y se actualiza con los datos de la API.
 *
 * Uso:
 * - ActivityProvider debe envolver los componentes que necesitan acceso al estado de las actividades.
 * - Los componentes anidados pueden acceder a las actividades utilizando el hook useContext con ActivityContext.
 *
 * Notas:
 * - Este patrón es útil para evitar el prop drilling (pasar props a múltiples niveles de componentes).
 * - El uso de un contexto centralizado facilita el manejo del estado relacionado con las actividades en la aplicación.
 */

import { useState, useEffect, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../config/axiosClient'

const ActivityContext = createContext()

const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    const viewActivities = async () => {
      try {
        const { data } = await axiosClient.get('/activities/view-activities')
        setActivities(data)
      } catch (error) {
        console.log(error)
      }
    }

    viewActivities()
  }, [])

  return (
    <ActivityContext.Provider
      value={{
        activities,
      }}
    >
      {children}
    </ActivityContext.Provider>
  )
}

export { ActivityProvider }
export default ActivityContext
