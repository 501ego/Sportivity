import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <section className="container mx-auto max-w-5xl">
      <article className="my-10 bg-white shadow-lg rounded-lg p-5">
        <h1 className="text-center text-sky-600 font-black text-5xl">
          Inicia sesión <br />
          <span className="text-slate-700 font-semibold text-4xl">
            Encuentra tu comunidad
          </span>
        </h1>

        <form className="p-10">
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password de Registro"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      </article>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm "
          to="/register"
        >
          ¿No tientes una cuenta? Regístrate
        </Link>{' '}
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/forgotmypass"
        >
          Olvide mi Password
        </Link>
      </nav>
    </section>
  )
}

export default Login
