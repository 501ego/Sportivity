import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axiosClient from '../config/axiosClient'
import Alert from '../components/Alert'

const ConfirmEmail = () => {
  const [alert, setAlert] = useState({})
  const [confirmAcount, setConfirmAcount] = useState(false)

  const params = useParams()
  const { id } = params

  useEffect(() => {
    const confirm = async () => {
      try {
        const url = `/account/confirm/${id}`
        const data = await axiosClient.get(url)
        setAlert({
          msg: data.msg,
          error: false,
        })
        setConfirmAcount(true)
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        })
      }
    }
    confirm()
  }, [])

  const { msg } = alert

  return (
    <>
      <div className="flex-col justify-center shadow-lg px-5 py-5 rounded-xl bg-white">
        <header className="flex justify-center">
          <h1 className="text-sky-600 font-black text-5xl mb-5">
            Confirma tu cuenta
          </h1>
        </header>
        <div className="flex justify-center">
          {confirmAcount && (
            <Link
              className="link link-hover text-center text-slate-500 uppercase text-sm"
              to="/"
            >
              Inicia Sesión
            </Link>
          )}
        </div>
      </div>
      {msg && <Alert alert={alert} />}
    </>
  )
}

export default ConfirmEmail
