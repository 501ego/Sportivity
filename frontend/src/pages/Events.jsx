import EventCard from '../components/EventCard'
import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import useEvent from '../hooks/useEvent'

const Events = () => {
	const { events } = useEvent()
	const { id } = useParams()
	const navigate = useNavigate()

	const eventsForCommunity = (events.filter(event => event.communityId === id))
	
	const handleClick = () => {
		navigate(`/main/community/${id}/new-event`)
  }

	return (
		<div className="flex-col w-full flex items-center">
			<div className="flex flex-row justify-center gap-4 mt-5">
				<button className="btn btn-accent w-full max-w-xs rounded-xl text-lg"
					onClick={handleClick}
				>
					Crear evento
				</button>
			</div>
      <section className="flex flex-col mt-5 max-w-7xl">
        <div className="flex flex-row flex-wrap gap-5 justify-center">
          {eventsForCommunity.length ? (
            eventsForCommunity.map((event, index) => (
              <div key={index}>
                <EventCard event={event} />
              </div>
            ))
          ) : (
            <h1 className="text-center text-accent font-black text-5xl mt-2 mb-5">
              No hay eventos
            </h1>
          )}
        </div>
      </section>
    </div>
	)
}

export default Events
