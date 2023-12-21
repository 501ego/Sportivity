/**
 * Componente CommunityCard
 *
 * Este componente representa una tarjeta para una comunidad individual en la aplicación.
 *
 * Props:
 * - community: Objeto que contiene la información de la comunidad a mostrar.
 *
 * Funcionalidades:
 * - Muestra el nombre y la descripción de la comunidad.
 * - Proporciona botones para unirse a la comunidad, ver más detalles o administrarla,
 *   según el rol del usuario (miembro, administrador, o no miembro).
 * - Redirige al usuario a la página de detalles de la comunidad al hacer clic en el nombre.
 *
 * Hooks:
 * - useCommunity: Hook para gestionar acciones relacionadas con la comunidad como enviar solicitudes.
 * - useAuth: Hook para acceder a la información de autenticación del usuario.
 * - useMember y useAdmin: Hooks para determinar si el usuario actual es miembro o administrador de la comunidad.
 * - useNavigate de 'react-router-dom' para la navegación.
 *
 * Estilos:
 * - Utiliza clases de Tailwind CSS para estilos como fondo, sombra, tipografía, y disposición.
 *
 * Componentes hijo:
 * - Alert: Componente para mostrar alertas o mensajes de feedback.
 *
 * Comportamiento:
 * - Al hacer clic en el botón correspondiente, el usuario puede unirse a la comunidad,
 *   ver detalles o administrar la comunidad, dependiendo de su rol.
 * - Al hacer clic en el nombre de la comunidad, se redirige al usuario a una vista detallada de la misma.
 *
 * Notas:
 * - El componente maneja sus propias alertas y acciones, lo que lo hace reutilizable en diferentes partes de la aplicación.
 */

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useCommunity from '../hooks/useCommunity'
import useAuth from '../hooks/useAuth'
import useAdmin from '../hooks/useAdmin'
import useMember from '../hooks/useMember'
import Alert from './Alert'

const CommunityCard = ({ community }) => {
  const { sendRequest, alert } = useCommunity()
  const { auth } = useAuth()
  const navigate = useNavigate()
  const handleJoin = async () => {
    await sendRequest(community._id)
  }

  const isMember = useMember(community)

  const isAdmin = useAdmin(community)

  const handleClick = () => {
    navigate(`/main/community/${community._id}`)
  }

  const { msg } = alert
  return (
    <section className="container bg-zinc-50 rounded-md shadow-md shadow-zinc-600 max-w-xl p-2 flex flex-col items-center mt-5">
      <article className="card-body flex flex-col w-full">
        <div className="cursor-pointer" onClick={handleClick}>
          <h2 className="card-title text-4xl font-black text-zinc-800 mb-2">
            {community.name}
          </h2>
          <div className="min-h-[175px] max-h-[175px] overflow-hidden">
            <p className="text-base text-zinc-700 font-semibold  xs:min-w-[500px]">
              {community.description}
            </p>
          </div>
        </div>
        <div className="card-actions justify-center mt-3">
          {isAdmin || isMember ? (
            isAdmin ? (
              <button
                className="btn btn-accent w-full max-w-xs rounded-xl text-lg"
                onClick={handleClick}
              >
                Administrar
              </button>
            ) : (
              <button
                className="btn btn-accent w-full max-w-xs rounded-xl text-lg"
                onClick={handleClick}
              >
                ver
              </button>
            )
          ) : (
            <button
              className="btn btn-accent w-full max-w-xs rounded-xl text-lg"
              onClick={handleJoin}
            >
              ¡Únete!
            </button>
          )}
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
