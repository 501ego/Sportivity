import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useCommunity from '../hooks/useCommunity'
import useAdmin from '../hooks/useAdmin.jsx'
import useMember from '../hooks/useMember.jsx'
import Rating from '../components/Rating'
import RulesComponent from '../components/RulesComponent.jsx'
import useAuth from '../hooks/useAuth'

const Community = () => {
  const { id } = useParams()
  const { community, getCommunity, deleteCommunity } = useCommunity()

  useEffect(() => {
    getCommunity(id)
  }, [])

  const { auth } = useAuth()

  let isMember

  const isAdmin = useAdmin(community)
  if (Array.isArray(community.members)) {
    isMember = useMember(community)
  }

  const handleClick = () => {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      deleteCommunity(id)
    }
  }

  return (
    <section className="flex flex-col items-center">
      <div className="normal-box max-w-5xl">
        <div className="lg:flex lg:justify-between">
          <h1 className="text-start uppercase text-zinc-600 font-black text-6xl mt-2">
            {' '}
            {community.name}
          </h1>
          {isAdmin && (
            <div className="flex flex-col items-center justify-center gap-1">
              <button className="btn-accent btn-sm rounded-md items-center flex justify-center">
                <Link to="edit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                  </svg>
                </Link>
              </button>

              <button
                className="bg-red-500 btn-sm rounded-md p-2 items-center flex w-full text-slate-100 hover:bg-red-600 justify-center"
                onClick={handleClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-row gap-4 mt-5 items-center">
          <img
            src="../../../public/img/location.png"
            className="h-[40px] w-[50px]"
          />
          <h2 className="text-start upper text-accent font-black text-4xl mt-2">
            {community.location}.
          </h2>
        </div>
        <div className="flex justify-center">
          <Rating />
        </div>
        <h3 className="text-start upper text-zinc-700 font-black text-4xl mt-2">
          Instructor: {community.admin}.
        </h3>
        <article className="flex flex-col items-center mt-10">
          <img src="../../../public/img/yoga1.jpg" width={700} />

          {isMember || isAdmin ? (
            <div className="flex flex-row justify-center gap-4 mt-5">
              <Link
                className="btn btn-accent w-full max-w-xs rounded-xl text-lg"
                to="events"
              >
                eventos
              </Link>

              <Link
                className="btn btn-accent w-full max-w-xs rounded-xl text-lg"
                to="foro"
              >
                Foro
              </Link>
            </div>
          ) : null}

          <div className="flex flex-col justify-center gap-4 mt-10 container max-w-4xl bg-slate-100 p-10">
            <h2 className="text-zinc-600 font-black text-4xl mb-2">
              Descripción:
            </h2>
            <p className=" text-zinc-700 text-xl">{community.description}</p>
          </div>
          <div className="flex flex-row justify-center gap-4 mt-5">
            <div className=" text-zinc-700 text-xl mb-5 mt-5">
              <RulesComponent rules={community.rules} />
            </div>
          </div>
          {isAdmin && (
            <div className="flex flex-row justify-center gap-4 mt-5">
              <Link
                className="btn btn-accent w-full max-w-xs rounded-xl text-lg"
                to="new-event"
              >
                Crear evento
              </Link>
            </div>
          )}
        </article>
      </div>
    </section>
  )
}

export default Community
