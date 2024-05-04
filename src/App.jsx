import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import SelectAppointment from './pages/SelectAppointment'
import Specialties from './components/Specialties'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useEffect } from 'react'
import authActions from './redux/actions/auth.actions'
import NotFoundError from './pages/NotFoundError'
import Contact from './pages/Contact'
import Neurology from './pages/Neurology'
import { withAuth } from './hocs/whitAuth'
import { Navigate } from 'react-router-dom'
import { getRoleFromJWT } from './utils/UserRole'
import SingUpDoctor from './pages/SingUpDoctor'
import SingUpAdmin from './pages/SingUpAdmin'
import AppointmentAdmin from './pages/AppointmentAdmin'
import PatientAdmin from './pages/PatientAdmin'
import DoctorAdmin from './pages/DoctorAdmin'
import PatientDetail from './pages/PatientDetail'
import DoctorDetail from './pages/DoctorDetail'
import SpecialtiesHome from './pages/SpecialtiesHome'




function App() {

    const user = useSelector(store => store.authReducer.user)

    const dispatch = useDispatch()

    const { current, login } = authActions

    // console.log(user)



    useEffect(() => {
        const token = localStorage.getItem("token")

        if (!user.loggedIn && !!token) {
            axios.get('/api/patient/current', {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
                .then(response => {
                    dispatch(current(response?.data))
                    dispatch(login(token))
                })
                .catch(error => console.log(error.response?.data))
        } 
    }, [])


    const SelectAppointmentWithauth = withAuth(SelectAppointment)
    const SpecialtiesWithAuth = withAuth(Specialties)
    const SingUpDoctorWithAuth = withAuth(SingUpDoctor)
    const DoctorAdminWithAuth = withAuth(DoctorAdmin)
    const PatientAdminWithAuth = withAuth(PatientAdmin)
    const AppointmentAdminrWithAuth = withAuth(AppointmentAdmin)
    const SingUpAdminWithAuth = withAuth(SingUpAdmin)
    const PatientDetailWithAuth = withAuth(PatientDetail)
    const DoctorDetailWithAuth = withAuth(DoctorDetail)


    const token = localStorage.getItem("token")
    const role = getRoleFromJWT(token)

    const isAdmin = role?.includes("ADMIN")
    const isUser = role?.includes("PATIENT")
    // const isDoctor = role?.includes("DOCTOR")


    return (
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/specialtiesHome" element={<SpecialtiesHome/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ineccu" element={<Neurology />} />
          <Route path="/registerDoctor" element={isAdmin ? <SingUpDoctorWithAuth /> : <Navigate to="/login" />} />
          <Route path="/registerAdmin" element={isAdmin ? <SingUpAdminWithAuth /> : <Navigate to="/login" />} />
          <Route path="/appointmentsAdmin" element={isAdmin ? <AppointmentAdminrWithAuth /> : <Navigate to="/login" />} />
          <Route path="/patientsAdmin" element={isAdmin ? <PatientAdminWithAuth /> : <Navigate to="/login" />} />
          <Route path="/doctorsAdmin" element={isAdmin ? <DoctorAdminWithAuth /> : <Navigate to="/login" />} />
          <Route path="/patientDetail/:id" element={isAdmin ? <PatientDetailWithAuth /> : <Navigate to="/login" />} />
          <Route path="/doctorsAdmin/:id" element={isAdmin ? <DoctorDetailWithAuth /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFoundError />} />

          <Route
            path="/"
            element={
              <MainLayout>
                <Outlet />
              </MainLayout>
            }>

            <Route path='appointment' element={isUser ? <SelectAppointmentWithauth /> : <Navigate to="/login" />}/>
            <Route path='specialties' element={isUser ? <SpecialtiesWithAuth /> : <Navigate to="/login" />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    )
}

export default App
