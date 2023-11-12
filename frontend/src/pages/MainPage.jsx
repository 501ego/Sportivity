import CommunityCard from '../components/CommunityCard'
import useCommunity from '../hooks/useCommunity'

const MainPage = () => {
  const comunnities = useCommunity()

  return (
    <div className="flex-col w-full flex items-center">
      <section className="flex flex-row gap-4 align-middle justify-center mt-5 flex-wrap max-w-6xl">
        <CommunityCard />
      </section>
    </div>
  )
}
export default MainPage
