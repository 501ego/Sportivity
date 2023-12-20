import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useCommunity from '../hooks/useCommunity'
import useMember from '../hooks/useMember'
import useEvent from '../hooks/useEvent'
import Alert from './Alert'
import moment from 'moment'

const EventCard = ({ event }) => {
  const { alert, participateEvent, exitFromEvent } = useEvent()
  const navigate = useNavigate()

  let isMember

  if (Array.isArray(event.members)) {
    isMember = useMember(event)
  }

  const handleJoin = async () => {
    if (confirm('¿Estás seguro de querer participar en el evento?')) {
      await participateEvent(event.communityId, event.eventId)
    }
  }

  const handleExit = async () => {
    if (confirm('¿Estás seguro de querer salirte del evento?')) {
      await exitFromEvent(event.communityId, event.eventId)
    }
  }

  const handleClick = () => {
    navigate(`/main/community/${event.communityId}/event/${event.eventId}`)
  }

  const { msg } = alert

  return (
    <section className="container bg-zinc-50 rounded-md shadow-md shadow-zinc-600 max-w-xl p-2 flex flex-col items-center mt-5">
      <article className="card-body flex flex-col w-full h-full">
        <div onClick={handleClick}>
          <h2 className="card-title text-4xl font-black text-zinc-800 mb-2">
            {event.name}
          </h2>
          <div className="min-h-[175px] max-h-[175px] overflow-hidden">
            <p className="text-base text-zinc-700 font-semibold  xs:min-w-[500px]">
              {event.description}
            </p>
          </div>
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
      </article>
      <div className="flex flex-row gap-4 align-middle justify-center mb-2 flex-wrap">
        <div className="badge badge-accent badge-outline p-3">
          <span className="font-semibold text-base">
            {moment(event.date).format('DD/MM/YYYY HH:mm')}
          </span>
        </div>
        <div className="badge badge-accent badge-outline p-3">
          <span className="font-semibold text-base">{event.location}</span>
        </div>
      </div>
      {msg && <Alert alert={alert} />}
    </section>
  )
}

export default EventCard
