import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { ActivityProvider } from './context/ActivityProvider'
import { CommunityProvider } from './context/CommunityProvider'
import { EventProvider } from './context/EventProvider'
import { ForumProvider } from './context/ForumProvider'
import SecureRoute from './layouts/SecureRoute'
import Register from './pages/Register'
import Login from './pages/Login'
import AuthLayout from './layouts/AuthLayout'
import ForgotMyPass from './pages/ForgotMyPass'
import ConfirmEmail from './pages/ConfirmEmail'
import NewPassword from './pages/NewPassword'
import MainPage from './pages/MainPage'
import RegisterCommunity from './pages/RegisterCommunity'
import UpgradeUser from './pages/UpgradeUser'
import MyCommunities from './pages/MyCommunities'
import Community from './pages/Community'
import NewEvent from './pages/NewEvent'
import EditCommunity from './pages/EditCommunity'
import { NotificationProvider } from './context/NotificationProvider'
import Events from './pages/Events'
import Event from './pages/Event'
import EditEvent from './pages/EditEvent'
import Foro from './pages/Foro'
import Participants from './pages/participants'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ActivityProvider>
          <CommunityProvider>
            <EventProvider>
              <NotificationProvider>
                <ForumProvider>
                  <Routes>
                    <Route path="/" element={<AuthLayout />}>
                      <Route index element={<Login />} />
                      <Route path="register" element={<Register />} />
                      <Route path="forgotmypass" element={<ForgotMyPass />} />
                      <Route
                        path="new-password/:token"
                        element={<NewPassword />}
                      />
                      <Route
                        path="confirm-email/:id"
                        element={<ConfirmEmail />}
                      />
                    </Route>
                    <Route path="/main" element={<SecureRoute />}>
                      <Route index element={<MainPage />} />
                      <Route
                        path="register-community"
                        element={<RegisterCommunity />}
                      />
                      <Route path="community/:id" element={<Community />} />
                      <Route path="upgrade-user" element={<UpgradeUser />} />
                      <Route
                        path="my-communities"
                        element={<MyCommunities />}
                      />
                      <Route
                        path="community/:id/edit"
                        element={<EditCommunity />}
                      />
                      <Route
                        path="community/:id/new-event"
                        element={<NewEvent />}
                      />
                      <Route path="community/:id/events" element={<Events />} />
                      <Route path="community/:id/foro" element={<Foro />} />
                      <Route
                        path="community/:id/event/:eventId"
                        element={<Event />}
                      />
                      <Route
                        path="community/:id/event/:eventId/edit"
                        element={<EditEvent />}
                      />
                      <Route
                        path="community/:id/event/:eventId/participants"
                        element={<Participants />}
                      />
                    </Route>
                  </Routes>
                </ForumProvider>
              </NotificationProvider>
            </EventProvider>
          </CommunityProvider>
        </ActivityProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
