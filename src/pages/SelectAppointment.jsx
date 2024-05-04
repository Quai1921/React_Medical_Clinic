import React, { useEffect, useState, useRef, Children } from 'react'
import { SPECIALITIES } from '../utils/linksSpecialities'
import axios from 'axios'
import { useSelector } from 'react-redux'
import CalendarAppointments from '../components/CalendarAppointments'
import { useDispatch } from 'react-redux'
import authActions from '../redux/actions/auth.actions.js'
import { useLocation } from 'react-router-dom'


function SelectAppointment() {

    const user = useSelector(store => store.authReducer.user)

    const location = useLocation()

    const [doctors, setDoctors] = useState([])

    const [specialitySelected, setSpecialitySelected] = useState(false)
    const [doctorSelected, setDoctorSelected] = useState(false)

    const [showAppointment, setShowAppointment] = useState(false)

    const [confirmDelete, setConfirmDelete] = useState([false, ""])

    const [successDelete, setSuccessDelete] = useState(false)

    const [selectedSpeciality, setSelectedSpeciality] = useState('')
    const [selectedDoctor, setSelectedDoctor] = useState(null)

    let appoinmentQuantity = user.appointments?.length
    
    let currentDate = new Date()
    let currentHour = currentDate.getHours()
    currentDate = currentDate.toISOString().split('T')[0]

    let appointmentsPending = user.appointments?.filter(appointment => appointment.date > new Date().toISOString().split('T')[0] || appointment.date == new Date().toISOString().split('T')[0] && appointment.time > currentHour).length
    // console.log(appointmentsPending)

    const dispatch = useDispatch()
    const { current } = authActions


    useEffect(() => {
        axios.get('/api/doctor/all')
            .then(response => {
                setDoctors(response.data)
            })
            .catch(error => console.log(error))
    }, [])


    useEffect(() => {
        if (location.state && location.state.doctor) {
            setSelectedDoctor(location.state.doctor)
            setSelectedSpeciality(location.state.doctor.speciality)
        }
    }, [location.state])

    const filteredDoctors = doctors.filter(doctor => doctor.speciality === selectedSpeciality)

    // console.log(doctors)

        const handleSpecialitySelect = (e) => {
            const speciality = e.target.value
            setSelectedSpeciality(speciality)
            setSelectedDoctor(null)
            setShowAppointment(false)
        }

        const handleDoctorSelect = (e) => {
            const fullName = e.target.value
            const selectedDoctor = doctors.find(doctor => `${doctor.firstName} ${doctor.lastName}` === fullName)
            setSelectedDoctor(selectedDoctor)
        }


        const handleShowAppointment = () => {
            if (selectedSpeciality && selectedDoctor) {
                setShowAppointment(true)
            } else {
                setShowAppointment(false)
            }
            if(!selectedSpeciality) {
                setSpecialitySelected(true)
            }
            if(!selectedDoctor) {
                setDoctorSelected(true)
            }
        }


    
    console.log(selectedDoctor)
    console.log(selectedSpeciality)

    // console.log(currentDate)
    // console.log(currentHour)

    // console.log(appointmentDate)
    // console.log(appointment.time)
    // const isPastAppointment = appointmentDate < currentDate || currentDate == appointmentDate && currentHour > appointment.time

    // console.log(doctors)

    // console.log(user.appointments)
    // console.log(selectedSpeciality)
    // console.log(filteredDoctors)
    // console.log(appoinmentQuantity)


    function handleDelete(e){

        setSuccessDelete(true)

        const appointmentIdToDelete = confirmDelete[1]


        const token = localStorage.getItem("token")

        axios.delete('/api/patient/deleteAppointment',  {
            headers: {
                Authorization: "Bearer " + token
            },
            data: {
                id: appointmentIdToDelete
            }
            
        }).then(response => {
            console.log(response.data)
            setConfirmDelete([false, ""])
        }).catch(error => console.log(error.response.data))
        
    }

    // console.log(confirmDelete)

    const handleCancel = () => {
        setConfirmDelete([false, ""])
    }

    const handleConfirm = (e) => {
        setConfirmDelete([true, e.target.id])
    }

    const handleSuccess = () => {
        setSuccessDelete(false)
        
        const token = localStorage.getItem("token")

        axios.get('/api/patient/current', {
            headers: {
                Authorization: "Bearer " + token
            }
        })
            .then(response => {
                dispatch(current(response.data))
            })
            .catch(error => console.log(error.response.data))
    }

        function handleSelectChange(e) {
        if (e.target.name === "speciality") {
            setSpecialitySelected(false)
        }
        if(e.target.name === "doctor") {
            setDoctorSelected(false)
        }
    }



    return (
    <div className='flex flex-1 flex-col justify-center items-center'>
        <h1 className='text-center font-bold mt-10 text-2xl'>Welcome {user.firstName + " " + user.lastName}!</h1>
        {appoinmentQuantity > 0 ?( 
        <>
            <h3 className='text-center text-[#06A9B2] font-bold mt-6 text-lg mb-6'>You have {appointmentsPending} upcomming medical appointments.</h3>
            <table className='w-[360px] min-[600px]:w-[521.38px]'>
                    <thead className='sticky top-0'>
                        <tr>
                            <th className='min-w-[60px] pb-2 text-center'><img className='w-10 min-[600px]:ml-8 ml-6' src="/CalendarAppointment.png" alt="Icon Calendar" /></th>
                            <th className='min-w-[60px] pb-2 text-center'><img className='w-10 min-[600px]:ml-9 ml-[34px]' src="/WatchBlue.png" alt="Icon Watch" /></th>
                            <th className='min-w-[100px] min-[600px]:min-w-[200px] pb-2 text-center'><img className='w-10 min-[600px]:ml-[85px] ml-[52px]' src="/Speciality.png" alt="Icon Speciality" /></th>
                            <th className='min-w-[100px] pb-2 text-center'><img className='w-10 min-[600px]:ml-10 ml-14' src="/Doctor.png" alt="Icon Doctor" /></th>
                            <th className='min-w-[50px] pb-2 text-center'></th>
                        </tr>
                    </thead>
            </table>
        </>) 
        
        : (<h1 className='font-bold text-center text-lg mt-6'>You still don't have medical appointments.</h1>)}
        
        
        {user.appointments?.length > 0 ? (
            <>
            <div className='overflow-auto max-h-[280px]'>
                    <table className='min-w-[360px]'>
                        <thead className='sticky top-0'>
                            <tr className='bg-gray-300 border-b-2 border-black'>
                                <th className='rounded-tl-xl py-1 text-center font-bold text-xs min-w-[80px] min-[600px]:text-base h-10'>Date</th>
                                <th className='rounded-sm py-1 text-center font-bold text-xs min-w-[30px] min-[600px]:text-base h-10'>Hour</th>
                                <th className='rounded-sm py-1 text-center font-bold text-xs min-w-[100px] min-[600px]:text-base h-10 min-[600px]:min-w-[200px]'>Specialty</th>
                                <th className='rounded-sm py-1 text-center font-bold text-xs min-w-[30px] min-[600px]:text-base h-10'>Doctor</th>
                                <th className='rounded-tr-xl py-1 text-center font-bold text-xs min-w-[20px] min-[600px]:text-base h-10'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.appointments
                            ?.toSorted((a, b) => b.time - a.time)
                            ?.toSorted((a, b) => new Date(b.date) - new Date(a.date))
                            ?.map(appointment => {
                                let currentDate = new Date()
                                let currentHour = currentDate.getHours()
                                currentDate = currentDate.toISOString().split('T')[0]
                                // console.log(currentDate)
                                // console.log(currentHour)
                                let appointmentDate = new Date(appointment.date)
                                appointmentDate = appointmentDate.toISOString().split('T')[0]
                                // console.log(appointmentDate)
                                // console.log(appointment.time)
                                const isPastAppointment = appointmentDate < currentDate || currentDate == appointmentDate && currentHour >= appointment.time
                                const colorClass = isPastAppointment ? 'text-gray-400' : 'text-green-500'
                                const hideTrash = isPastAppointment ? 'hidden' : ''

                                return (
                                <tr key={appointment.id} className='border-b-2 border-gray-400'>
                                    <td className={`font-semibold text-center text-xs min-[600px]:text-base h-10 md:px-2 ${colorClass}`}>{appointment.date}</td>
                                    <td className={`font-semibold text-center text-xs min-[600px]:text-base h-10 px-3 ${colorClass}`}>{appointment.time}:00</td>
                                    <td className={`font-semibold text-center text-[12px] min-[600px]:text-base h-10 min-[600px]:hidden ${colorClass}`}>{doctors?.find (doctor => doctor.firstName + " " + doctor.lastName === appointment.doctor)?.speciality.slice(0,4)}</td>
                                    <td className={`font-semibold text-center text-[12px] min-[600px]:text-base h-10 max-[600px]:hidden ${colorClass}`}>{doctors?.find (doctor => doctor.firstName + " " + doctor.lastName === appointment.doctor)?.speciality}</td>
                                    <td className={`font-semibold text-xs min-[600px]:text-base h-10 px-2 ${colorClass}`}>{appointment.doctor}</td>
                                    <td className='md:px-2 cursor-pointer'><img id={appointment.id} onClick={handleConfirm} src="/Delete.png" alt="Icon delete appointment" className={`w-4 ${hideTrash}`}/></td>
                                    
                                </tr>
                            )})}
                        </tbody>
                    </table>
                    {confirmDelete[0] && (
                        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-md w-[70%] md:w-[40%]">
                                <p className='text-center text-xl font-bold pb-4'>Do you really want to cancel your appointment?</p>
                                <div className="flex justify-center gap-4 mt-4">
                                    <button className="bg-green-500 text-white font-bold py-2 rounded-md w-[90px]" onClick={handleDelete}>Confirm</button>
                                    <button className="bg-red-600 font-bold py-2 rounded-md w-[90px] text-white" onClick={handleCancel}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {successDelete && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <p className='text-center text-xl font-bold text-red-600'>The appointment</p>
                            <p className='text-center text-xl font-bold text-red-600'>has been canceled!</p>
                            <div className="flex justify-center gap-4 mt-4">
                                <button className="bg-green-500 text-white font-semibold py-2 rounded-md w-[90px]" onClick={handleSuccess}>Continue</button>
                            </div>
                        </div>
                    </div>
                    )}
            </div>
            <div className="flex gap-4 justify-evenly items-center mt-6">
                        <div className="flex items-center gap-1">
                            <div className="flex w-5 h-2 rounded-md bg-green-500 "></div>
                            <p className="font-semibold text-sm">Upcomming appointments</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="flex w-5 h-2 rounded-md bg-gray-400 "></div>
                            <p className="font-semibold text-sm">Past appointments</p>
                        </div>
                    </div>
            </>
            ) : null}
        
        
        <div className='flex flex-1 flex-col justify-center items-center'>
            <h3 className='text-center text-[#06A9B2] font-bold mt-10 px-2 text-2xl'>Get your medical appointment with just one click!</h3>
            <div className='flex flex-col justify-center items-center mt-6 gap-6'>
                <div className='flex flex-col gap-6 md:flex-row md:gap-20'>
                    <fieldset className='flex justify-center items-center gap-3 relative'>
                        <select name="speciality" onChange={handleSpecialitySelect} value={selectedSpeciality} className='font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4 relative' 
                        onFocus={handleSelectChange}>
                            <option value="" >Please select a speciality...</option>
                            {SPECIALITIES.map((speciality, index) => (
                                <option key={index} value={speciality}>{speciality}</option>
                            ))}
                        </select>
                        {specialitySelected && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-17px] left-6'>Please select a speciality</p>}
                    </fieldset>
                    <fieldset className='flex justify-center items-center gap-3 relative'>
                        <select name="doctor" onChange={handleDoctorSelect} value={selectedDoctor ? `${selectedDoctor.firstName} ${selectedDoctor.lastName}` : ''} className='font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4'
                        onFocus={handleSelectChange}>
                            <option value="">Please select a doctor...</option>
                            {filteredDoctors.map((doctor, index) => (
                                <option key={index} value={`${doctor.firstName} ${doctor.lastName}`}>{doctor.firstName} {doctor.lastName}</option>
                            ))}
                        </select>
                        {doctorSelected && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-17px] left-6'>Please select a doctor</p>}
                    </fieldset>
                </div>
                <button className='bg-[#F19E22] font-bold text-white w-40 h-14 rounded-lg mt-6 hover:bg-[#dc901e] mb-14' onClick={handleShowAppointment}>Show Available Appointments</button>
                {showAppointment && selectedDoctor && (
                    <div>
                        <CalendarAppointments doctorConfirmed={selectedDoctor} />
                    </div>
                )}
            </div>
        </div>
        
    </div>
    )
}

export default SelectAppointment
