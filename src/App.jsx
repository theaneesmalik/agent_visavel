/** @format */
import { Route, Routes } from 'react-router-dom'
import { LoginPage, RegisterPage } from './pages/auth'
import {
  ProfilePage,
  DashboardPage,
  JobsPage,
  SupportPage,
  EditProfilePage,
  NewJobPage,
  ShowJobPage,
} from './pages'
import Protected from './context/Protected'
import Layout from './components/Layout'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route element={<Protected />}>
          <Route element={<Layout />}>
            <Route path='/' element={<DashboardPage />} />
            <Route path='/jobs' element={<JobsPage />} />
            <Route path='/jobs/new' element={<NewJobPage />} />
            <Route path='/jobs/show' element={<ShowJobPage />} />
            <Route path='/support' element={<SupportPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/profile/edit' element={<EditProfilePage />} />
            <Route path='/*' element={<DashboardPage />} />
          </Route>
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/*' element={<DashboardPage />} />
      </Routes>
    </div>
  )
}

export default App
