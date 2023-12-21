import CommunityForm from '../components/CommunityForm'

const RegisterCommunity = () => {
  return (
    <section className="container mx-auto max-w-2xl h-[calc(90vh)] items-center justify-center flex p-2">
      <article className="normal-box">
        <h1 className="text-center text-accent font-black text-5xl mt-2 mb-5">
          Registra tu comunidad
        </h1>
        <CommunityForm />
      </article>
    </section>
  )
}
export default RegisterCommunity
