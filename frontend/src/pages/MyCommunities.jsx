import CommunityCard from '../components/CommunityCard'
import useCommunity from '../hooks/useCommunity'

const MyCommunities = () => {
  const { myCommunities } = useCommunity()

  return (
    <div className="flex-col w-full flex items-center">
      <section className="flex flex-row gap-4 align-middle justify-center mt-5 flex-wrap max-w-7xl">
        {myCommunities.length ? (
          myCommunities.map(Community => (
            <div key={Community._id}>
              <CommunityCard community={Community} />
            </div>
          ))
        ) : (
          <h1 className="text-center text-sky-600 font-black text-5xl mt-2 mb-5">
            No hay comunidades
          </h1>
        )}
      </section>
    </div>
  )
}

export default MyCommunities
