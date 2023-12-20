import useEvent from '../hooks/useEvent'

const Participants = () => {
  const { event } = useEvent()

  return (
    <section className="container mx-auto max-w-5xl h-[calc(90vh)] items-center justify-center flex">
      <div className="container bg-zinc-50 rounded-md shadow-md shadow-zinc-600 max-w-xl p-2 flex flex-col mt-5 justify-center items-center">
        <h1 className="uppercase text-zinc-600 font-black text-5xl">
          Participants
        </h1>
        <div className="flex justify-start gap-4 mt-5">
          <ul>
            {event &&
              event.members.map(participant => (
                <li key={participant.id}>
                  {participant.name} - {participant.email}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Participants
