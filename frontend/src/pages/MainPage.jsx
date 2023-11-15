import CommunityCard from '../components/CommunityCard'
import useCommunity from '../hooks/useCommunity'

const MainPage = () => {
  const { communities } = useCommunity()

  return (
    <div className="flex-col w-full flex items-center">
      <section className="flex flex-row gap-4 align-middle justify-center mt-5 flex-wrap max-w-7xl">
        {communities.length ? (
          communities.map((Community, index) => (
            <div key={index}>
              <CommunityCard community={Community} />
            </div>
          ))
        ) : (
          <h1>No hay comunidades</h1>
        )}
      </section>
    </div>
  )
}
export default MainPage