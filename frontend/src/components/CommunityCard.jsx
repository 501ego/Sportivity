import { Link } from 'react-router-dom'

const CommunityCard = ({ community }) => {
  return (
    <Link to={`community/${community._id}`} className="hover:bg-zinc-600">
      <section className="container bg-zinc-50 rounded-md shadow-md shadow-zinc-600 max-w-xl p-2 flex flex-col items-center mt-5">
        <figure></figure>
        <article className="card-body">
          <h2 className="card-title text-4xl font-black text-zinc-800 mb-2">
            {community.name}
          </h2>
          <div className="min-h-[175px] max-h-[175px] overflow-hidden">
            <p className="text-base text-zinc-700 font-semibold">
              {community.description}
            </p>
          </div>
          <div className="card-actions justify-center mt-3">
            <button className="btn btn-accent w-full max-w-xs rounded-xl text-lg">
              ¡Únete!
            </button>
          </div>
        </article>
        <div className="flex flex-row gap-4 align-middle justify-center mb-2 flex-wrap">
          <div className="badge badge-accent badge-outline p-3">
            <span className="font-semibold text-base">
              {community.location}
            </span>
          </div>
          <div className="badge badge-accent badge-outline p-3">
            <span className="font-semibold text-base">
              {community.activity}
            </span>
          </div>
        </div>
      </section>
    </Link>
  )
}

export default CommunityCard
