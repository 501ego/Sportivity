import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useEvent from "../hooks/useEvent"
import EditEventForm from "../components/EditEventForm"

const EditEvent = () => {

	const params = useParams()
	const { getEvent, event, loading } = useEvent()

	useEffect(() => {
		getEvent(params.eventId)
	}, [])

	if (loading) {
		return "Cargando..."
	}

	return (
		<section className="container mx-auto max-w-2xl h-[calc(90vh)] items-center justify-center flex p-2">
      <article className="normal-box">
        <h1 className="text-center text-sky-600 font-black text-5xl mt-2 mb-5">
          Editar comunidad {event.name}
					<EditEventForm />
        </h1>
      </article>
    </section>
	)
}

export default EditEvent
