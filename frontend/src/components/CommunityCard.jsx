import { useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../config/axiosClient'
import Alert from './Alert'

const CommunityCard = ({ community }) => {
  const [alert, setAlert] = useState({})
  const handleJoin = async () => {
    //TODO implementar en provider
    try {
      const communityId = community._id
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const config = {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
      console.log(token)
      const { data } = await axiosClient.get(
        `/communities/sendrequest/${communityId}`,
        config
      )

      setAlert({
        msg: data.msg,
        error: false,
      })
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      })
    }
  }

  const { msg } = alert
  return (
    <section className="container bg-zinc-50 rounded-md shadow-md shadow-zinc-600 max-w-xl p-2 flex flex-col items-center mt-5">
      <figure></figure>
      <article className="card-body">
        <Link to={`community/${community._id}`}>
          <h2 className="card-title text-4xl font-black text-zinc-800 mb-2">
            {community.name}
          </h2>
          <div className="min-h-[175px] max-h-[175px] overflow-hidden">
            <p className="text-base text-zinc-700 font-semibold">
              {community.description}
            </p>
          </div>
        </Link>
        <div className="card-actions justify-center mt-3">
          <button
            className="btn btn-accent w-full max-w-xs rounded-xl text-lg"
            onClick={handleJoin}
          >
            ¡Únete!
          </button>
        </div>
      </article>
      <div className="flex flex-row gap-4 align-middle justify-center mb-2 flex-wrap">
        <div className="badge badge-accent badge-outline p-3">
          <span className="font-semibold text-base">{community.location}</span>
        </div>
        <div className="badge badge-accent badge-outline p-3">
          <span className="font-semibold text-base">{community.activity}</span>
        </div>
      </div>
      {msg && <Alert alert={alert} />}
    </section>
  )
}

export default CommunityCard
