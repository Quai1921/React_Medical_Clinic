import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import CalendarAppointmentsAdmin from '../components/CalendarAppointmentsAdmin'
import HeaderAdmin from '../components/HeaderAdmin'
import FooterAdmin from '../components/FooterAdmin'
import { SPECIALITIES } from '../utils/linksSpecialities'



function AppointmentAdmin() {

    const [doctors, setDoctors] = useState([])
    const [filteredDoctors, setFilteredDoctors] = useState([])
    const [patients, setPatients] = useState([])
    const [selectedSpecialityAndDoctor, setSelectedSpecialityAndDoctor] = useState({
        speciality: '',
        doctor: ''
    })

    const [doctorConfirmed, setDoctorConfirmed] = useState({})

    const [specialitySelected, setSpecialitySelected] = useState(false)
    const [doctorSelected, setDoctorSelected] = useState(false)

    const [showAppointment, setShowAppointment] = useState(false)
    const [showDoctors, setShowDoctors] = useState(false)
    const [showPatients, setShowPatients] = useState(false)

    const specialityRef = useRef(null)
    const doctorRef = useRef(null)

    const [email, setEmail] = useState('')
    const [user, setUser] = useState("")
    // const [specialities, setSpecialities] = useState([])

    useEffect(() => {

        const token = localStorage.getItem('token')

        axios.get('/api/patient/all',
            {headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(response => {
                setPatients(response.data)
            })
            .catch(error => {
                // console.log(error)
            })
    }, [])

    // console.log(patients)

    // useEffect(() => {
    //     axios.get('/api/doctor/specialities')
    //         .then(response => {
    //             setSpecialities(response.data)
    //         })
    //         .catch(error => console.log(error))
    // }, [])

    useEffect(() => {
        axios.get('/api/doctor/all')
            .then(response => {
                setFilteredDoctors(response.data)
            })
            .catch(error => {
                // console.log(error)
            })
    }, [])
    
    useEffect(() => {
        axios.get('/api/doctor/all')
            .then(response => {
                setDoctors(response.data)
            })
            .catch(error => {
                // console.log(error)
            })
    }, [])


    const [isOpen, setIsOpen] = useState(false)


    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])

    // console.log(doctors)

    const handleSpecialitySelect = (e) => {
        setFilteredDoctors(doctors.filter(doctor => doctor.speciality === e.target.value))
        setSelectedSpecialityAndDoctor({
            ...selectedSpecialityAndDoctor,
            doctor: '',
        })
        }

    function handleInput(e) {
        setDoctorConfirmed(doctors.find(doctor => doctor.firstName + " " + doctor.lastName === e.target.value))
        
        return setSelectedSpecialityAndDoctor({
            ...selectedSpecialityAndDoctor,
            [e.target.name]: e.target.value
        })
    }

    // console.log(doctorConfirmed)

    function handleShowAppointment(e) {
        if (selectedSpecialityAndDoctor.speciality && selectedSpecialityAndDoctor.doctor) {

            setShowAppointment(true)
        } else {
            setShowAppointment(false)
        }

        if(!selectedSpecialityAndDoctor.speciality) {
            setSpecialitySelected(true)
        }
        if(!selectedSpecialityAndDoctor.doctor) {
            setDoctorSelected(true)
        }
    }

    function handleDoctors(e) {
        setUser(patients.find(patient => patient.email == email))
    }



    function patientEmail(e) {
        setEmail(e.target.value)
    }

    function handleSelectChange(e) {
        if (e.target.name === "speciality") {
            setSpecialitySelected(false)
        }
        if(e.target.name === "doctor") {
            setDoctorSelected(false)
        }
        setShowAppointment(false)
    }

    //let appoinmentQuantity = user.appointments?.length
    
    //let appointmentsDays = user.appointments?.map(appointment => appointment.date)

    //let appointmentsPending = appointmentsDays?.filter(appointment => appointment > new Date().toISOString().split('T')[0]).length

    //console.log(appointmentsPending)

    // console.log(selectedSpecialityAndDoctor)
    // console.log(doctors)

    // console.log(user.appointments)
    // console.log(selectedSpeciality)
    // console.log(filteredDoctors)
    // console.log(appoinmentQuantity)

    return (

        <div>

        <HeaderAdmin/>


        <main className='flex flex-col w-full min-h-dvh'>
            <div className='flex flex-wrap justify-center items-center w-full'>
                <img className='md:w-full object-cover object-center' src="/BannerAdmin.png" alt="Image a doctor" />
            </div>

            <h3 className='text-center text-[#06A9B2] font-bold mt-10 px-2 text-2xl'>Register an appointment</h3>
            <div className='flex flex-col justify-center items-center mt-6'>
                <input type='text' name='patientEmail' onInput={patientEmail} className='font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4 relative' placeholder='Enter patient email'></input>
                {(user == undefined)  &&  <p className='text-red-600 font-bold italic text-xs mt-2'>There isn't any patient with that email</p>}
                <button className='bg-[#F19E22] font-bold text-white w-36 h-10 rounded-lg mt-6 hover:bg-[#dc901e] mb-4' onClick={handleDoctors}>Show doctors</button>
            </div>

            {(user != undefined && user != "") && (
            
            <div className='flex flex-col justify-center items-center mt-6 gap-6'>
                <div className='flex flex-col gap-6 md:flex-row md:gap-20'> 
                    <fieldset className='flex justify-center items-center gap-3 relative'>
                        <img src="/Speciality.png" alt="Image hands and health" className='w-8'/>
                        <select ref={specialityRef} name="speciality" onChange={handleSpecialitySelect} onClick={handleInput} onFocus={handleSelectChange} className='font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4 relative'>
                            <option value="" >Select a speciality...</option>
                            {SPECIALITIES?.map((speciality, index) => (
                                <option key={index} value={speciality}>{speciality}</option>
                            ))}
                        </select>
                        {specialitySelected && <p className='text-red-600 font-bold italic text-xs absolute top-[40px] left-16'>Please select a speciality</p>}
                    </fieldset>
                    
                    <fieldset className='flex justify-center items-center gap-3 relative'>
                        <img src="/Doctor.png" alt="Image doctor icon" className='w-8' />
                        <select ref={doctorRef} name="doctor" className='font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4' onClick={handleInput} onFocus={handleSelectChange}>
                            <option value=""  >Select a doctor...</option>
                            {filteredDoctors.map((doctor, index) => (
                                <option key={index} value={doctor.firstName + " " + doctor.lastName}>{doctor.firstName + " " + doctor.lastName}</option>
                            ))}
                        </select>
                        {doctorSelected && <p className='text-red-600 font-bold italic text-xs absolute top-[40px] left-16'>Please select a doctor</p>}
                    </fieldset>
                </div>
                

                <button className='bg-[#F19E22] font-bold text-white w-40 h-14 rounded-lg mt-6 hover:bg-[#dc901e] mb-14' onClick={handleShowAppointment}>Show Available Appointments</button>
                </div>
                )}

                {showAppointment && (
                <div>
                    <CalendarAppointmentsAdmin doctorConfirmed={doctorConfirmed} patientConfirmed={user}/>
                </div>
                )}

        </main>


        <FooterAdmin/>
        
    </div>
    )
}

export default AppointmentAdmin