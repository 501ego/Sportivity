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
    <section className="screen-center">
      <div className="normal-box">
        <header className="flex justify-center">
          <h1 className="text-accent font-black text-5xl mb-5">
            Confirma tu cuenta
          </h1>
        </header>
        <div className="flex justify-center">
          {confirmAcount && (
            <Link className="custom-link" to="/">
              <span className="text-xl">Inicia Sesión</span>
            </Link>
          )}
        </div>
      </div>
      {msg && <Alert alert={alert} />}
    </section>
  )
}

export default ConfirmEmail
