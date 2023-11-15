import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import useCommunity from '../hooks/useCommunity'
import Rating from '../components/Rating'
import RulesComponent from '../components/RulesComponent.jsx'

const Community = () => {
  const { id } = useParams()
  const { community, getCommunity } = useCommunity()

  useEffect(() => {
    getCommunity(id)
  }, [])
  return (
    <section className="flex flex-col items-center">
      <div className="normal-box max-w-5xl">
        <h1 className="text-start uppercase text-zinc-600 font-black text-6xl mt-2">
          {' '}
          {community.name}
        </h1>
        <div className="flex flex-row gap-4 mt-5 items-center">
          <img
            src="../../../public/img/location.png"
            className="h-[40px] w-[50px]"
          />
          <h2 className="text-start upper text-sky-700 font-black text-4xl mt-2">
            {community.location}.
          </h2>
        </div>
        <Rating />
        <h3 className="text-start upper text-zinc-700 font-black text-4xl mt-2">
          Instructor: {community.admin}.
        </h3>
        <article className="flex flex-col items-center mt-10">
          <img src="../../../public/img/yoga1.jpg" width={700} />
          <div className="flex flex-col justify-center gap-4 mt-10 container max-w-4xl bg-slate-100 p-10">
            <h2 className="text-zinc-600 font-black text-4xl mb-2">
              Descripción:
            </h2>
            <p className=" text-zinc-700 text-2xl">{community.description}</p>
          </div>
          <div className="flex flex-row justify-center gap-4 mt-5">
            <div className=" text-zinc-700 text-2xl mb-5 mt-5">
              <RulesComponent rules={community.rules} />
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default Community
