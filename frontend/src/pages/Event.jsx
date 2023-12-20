import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useEvent from '../hooks/useEvent'
import useMember from '../hooks/useMember'
import moment from 'moment'
import SimpleMap from '../components/map'
import Alert from '../components/Alert'

const Event = () => {
  const { id, eventId } = useParams()
  const {
    events,
    getEvent,
    participateEvent,
    alert,
    event,
    deleteEvent,
    exitFromEvent,
  } = useEvent()
  const [mapCenter, setMapCenter] = useState({
    lat: -33.44194,
    lng: -70.63201,
  })

  let isMember

  if (Array.isArray(event.members)) {
    isMember = useMember(event)
  }

  useEffect(() => {
    getEvent(eventId)
  }, [])

  const handleDelete = async () => {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      await deleteEvent(id, eventId)
    }
  }

  const handleJoin = async () => {
    if (confirm('¿Estás seguro de querer participar en el evento?')) {
      await participateEvent(id, eventId)
    }
  }

  const handleExit = async () => {
    if (confirm('¿Estás seguro de querer salirte del evento?')) {
      await exitFromEvent(id, eventId)
    }
  }

  const { msg } = alert

  return (
    <section className="container mx-auto max-w-5xl h-[calc(90vh)] items-center justify-center flex">
      <div className="container bg-zinc-50 rounded-md shadow-md shadow-zinc-600 max-w-xl p-2 flex flex-col mt-5">
        <article className="flex flex-col w-full items-center p-5">
          <div>
            <div className="flex flex-row justify-between items-center">
              <h2 className="card-title text-4xl font-black text-zinc-800 mb-2">
                {event.name}
              </h2>

              <div className="flex flex-col items-center justify-center gap-1">
                <button className="btn-accent btn-sm rounded-md items-center flex justify-center mt-2">
                  <Link to="edit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                    </svg>
                  </Link>
                </button>

                <button
                  className="bg-red-500 btn-sm rounded-md p-2 items-center flex w-full text-slate-100 hover:bg-red-600 justify-center"
                  onClick={handleDelete}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="min-h-[175px] max-h-[175px] overflow-hidden">
              <p className="text-base text-zinc-700 font-semibold  xs:min-w-[500px]">
                {event.description}
              </p>
            </div>
          </div>

          <Link
            to="Participants"
            className="btn btn-accent max-w-xs rounded-xl text-lg flex justify-center items-center w-full"
          >
            Participantes
          </Link>
        </article>
        <div className="w-full">
          <SimpleMap center={mapCenter} zoom={11} />
        </div>
        {isMember ? (
          <div className="flex flex-row justify-center p-2">
            <button
              onClick={handleExit}
              className="btn  btn-accent bg-red-500 hover:bg-red-600 max-w-xs rounded-xl text-lg flex justify-center items-center w-full"
            >
              Dejar de participar
            </button>
          </div>
        ) : (
          <div className="flex flex-row justify-center p-2">
            <button
              onClick={handleJoin}
              className="btn btn-accent max-w-xs rounded-xl text-lg flex justify-center items-center w-full"
            >
              Participar
            </button>
          </div>
        )}
        <div className="flex flex-row gap-4 align-middle justify-center mb-2 mt-2 flex-wrap">
          <div className="badge badge-accent badge-outline p-3">
            <span className="font-semibold text-base">
              {moment(event.date).format('DD/MM/YYYY HH:mm')}
            </span>
          </div>
          <div className="badge badge-accent badge-outline p-3">
            <span className="font-semibold text-base">{event.location}</span>
          </div>
        </div>
      </div>
      {msg && <Alert alert={alert} />}
    </section>
  )
}

export default Event
