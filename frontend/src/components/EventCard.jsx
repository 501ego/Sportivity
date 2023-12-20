import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useCommunity from '../hooks/useCommunity'
import useEvent from '../hooks/useEvent'
import Alert from './Alert'
import moment from 'moment'

const EventCard = ({ event }) => {
  const { alert, participateEvent } = useEvent()
  const navigate = useNavigate()

  const handleJoin = async () => {
    await participateEvent(event.communityId, event.eventId)
  }

  const handleClick = () => {
    navigate(`/main/community/${event.communityId}/event/${event.eventId}`)
  }

  const { msg } = alert

  return (
    <section className="container bg-zinc-50 rounded-md shadow-md shadow-zinc-600 max-w-xl p-2 flex flex-col items-center mt-5">
      <article className="card-body flex flex-col w-full">
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
        <div className="card-actions justify-center mt-3">
          <button
            className="btn btn-accent w-full max-w-xs rounded-xl text-lg"
            onClick={handleJoin}
          >
            Participar
          </button>
        </div>
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
