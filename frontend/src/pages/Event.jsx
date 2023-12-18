import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import useEvent from "../hooks/useEvent"

const Event = () => {

	const { id } = useParams()
	const { events, getEvents } = useEvent()

	return (
		<div>
			<h1>Events</h1>
		</div>
	)
}

export default Event
