import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useCommunity from '../hooks/useCommunity'
import CommunityForm from '../components/CommunityForm'

const EditCommunity = () => {
  const params = useParams()
  const { getCommunity, community, loading } = useCommunity()

  useEffect(() => {
    getCommunity(params.id)
  }, [])

  if (loading) {
    return 'Cargando...'
  }


  return (
    <section className="container mx-auto max-w-2xl h-[calc(90vh)] items-center justify-center flex p-2">
      <article className="normal-box">
        <h1 className="text-center text-sky-600 font-black text-5xl mt-2 mb-5">
          Editar comunidad {community.name}
        </h1>
        <CommunityForm />
      </article>
    </section>
  )
}

export default EditCommunity
