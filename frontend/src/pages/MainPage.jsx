import CommunityCard from '../components/CommunityCard'
import useCommunity from '../hooks/useCommunity'
import { useState } from 'react'

const MainPage = () => {
  const { communities, searchCommunity } = useCommunity()
  const [search, setSearch] = useState('')

  const handleSearchChange = event => {
    setSearch(event.target.value)
  }

  const executeSearch = () => {
    searchCommunity(search)
  }

  return (
    <div className="flex-col w-full flex items-center">
      <div className="form-control mt-5">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered"
          onChange={handleSearchChange}
          value={search}
          onKeyDown={e => e.key === 'Enter' && executeSearch()}
        />
      </div>
      <section className="flex flex-col mt-5 max-w-7xl">
        <div className="flex flex-row flex-wrap gap-5 justify-center">
          {communities.length ? (
            communities.map((community, index) => (
              <div key={index}>
                <CommunityCard community={community} />
              </div>
            ))
          ) : (
            <h1 className="text-center text-accent font-black text-5xl mt-2 mb-5">
              No hay comunidades
            </h1>
          )}
        </div>
      </section>
    </div>
  )
}

export default MainPage
