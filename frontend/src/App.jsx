import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { ActivityProvider } from './context/ActivityProvider'
import { CommunityProvider } from './context/CommunityProvider'
import SecureRoute from './layouts/SecureRoute'
import Register from './pages/Register'
import Login from './pages/Login'
import AuthLayout from './layouts/AuthLayout'
import ForgotMyPass from './pages/ForgotMyPass'
import ConfirmEmail from './pages/ConfirmEmail'
import NewPassword from './pages/NewPassword'
import MainPage from './pages/MainPage'
import RegisterCommunity from './pages/RegisterCommunity'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ActivityProvider>
          <CommunityProvider>
            <Routes>
              <Route path="/" element={<AuthLayout />}>
                <Route index element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgotmypass" element={<ForgotMyPass />} />
                <Route path="new-password/:token" element={<NewPassword />} />
                <Route path="confirm-email/:id" element={<ConfirmEmail />} />
              </Route>
              <Route element={<SecureRoute />}>
                <Route path="/main-page" index element={<MainPage />} />
                <Route
                  path="register-community"
                  element={<RegisterCommunity />}
                />
              </Route>
            </Routes>
          </CommunityProvider>
        </ActivityProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
