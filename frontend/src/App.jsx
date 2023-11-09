import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import AuthLayout from './layouts/AuthLayout'
import ForgotMyPass from './pages/ForgotMyPass'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgotmypass" element={<ForgotMyPass />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
