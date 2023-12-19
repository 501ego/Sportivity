import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useEvent from '../hooks/useEvent'
import moment from 'moment'
import SimpleMap from '../components/map'

const Event = () => {
  const { id, eventId } = useParams()
  const { events, getEvent } = useEvent()
  const [event, setEvent] = useState({})

  useEffect(() => {
    const data = getEvent(id, eventId)
    setEvent(data)
  }, [])

  const simulatedCoordinates = {
    lat: 59.955413, // Latitud simulada
    lng: 30.337844, // Longitud simulada
  }

  return (
    <section className="container mx-auto max-w-2xl h-[calc(90vh)] items-center justify-center flex p-2">
      <div className="container bg-zinc-50 rounded-md shadow-md shadow-zinc-600 max-w-xl p-2 flex flex-col items-center mt-5">
        <article className="card-body flex flex-col w-full">
          <div>
            <h2 className="card-title text-4xl font-black text-zinc-800 mb-2">
              {events.name}
            </h2>
            <div className="min-h-[175px] max-h-[175px] overflow-hidden">
              <p className="text-base text-zinc-700 font-semibold  xs:min-w-[500px]">
                {events.description}
              </p>
            </div>
          </div>
        </article>
        <div className="flex flex-row gap-4 align-middle justify-center mb-2 flex-wrap">
          <div className="badge badge-accent badge-outline p-3">
            <span className="font-semibold text-base">
              {moment(events.date).format('DD/MM/YYYY HH:mm')}
            </span>
          </div>
          <div className="badge badge-accent badge-outline p-3">
            <span className="font-semibold text-base">{events.location}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4 mt-5 items-center">
        <SimpleMap
          center={simulatedCoordinates}
          zoom={11}
          text={event.name || 'Ubicación Simulada'}
        />
      </div>
    </section>
  )
}

export default Event
