import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AdminPanel = () => {

    const [listAppointments, setListAppointments] = useState([])
    const [listDoctors, setListDoctors] = useState([])
    const [listPatients, setListPatients] = useState([])

    const [appointmentsFilters, setAppointmentsFilters] = useState({
        date: '',
        patient: '',
        doctor: '',
        time: ''
    })

    const [doctorFilters, setDoctorFilters] = useState({
        firstName: '',
        lastName: '',
        speciality: '',
        workDays: '',
        hours: ''
    })

    const [patientFilters, setPatientFilters] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        genre: ''
    })





    useEffect(() => {
        axios.get('/api/appointment/')
            .then(response => {
                // console.log(response.data)
                setListAppointments(response.data)
            })
            .catch(error => {
                // console.log(error.response.data)
            })
        
    }, []) 



    useEffect(() => {
        axios.get('/api/doctor/all')
            .then(response => {
                // console.log(response.data)
                setListDoctors(response.data)
            })
            .catch(error => {
                // console.log(error.response.data)
            })
        
    }, []) 


    useEffect(() => {
        axios.get('/api/patient/all')
            .then(response => {
                // console.log(response.data)
                setListPatients(response.data)
            })
            .catch(error => {
                // console.log(error.response.data)
            })
        
    }, []) 



    const filterAppointments = (appointments) => {
        return appointments.filter((appointment) => {
            const dateMatch = !appointmentsFilters.date || appointment.date.toLowerCase().includes(appointmentsFilters.date.toLowerCase())
            const patientMatch = !appointmentsFilters.patient || appointment.patient.toLowerCase().includes(appointmentsFilters.patient.toLowerCase())
            const doctorMatch = !appointmentsFilters.doctor || appointment.doctor.toLowerCase().includes(appointmentsFilters.doctor.toLowerCase())
            const timeMatch = !appointmentsFilters.time || appointment.time.toString().toLowerCase().includes(appointmentsFilters.time.toString().toLowerCase())
            return dateMatch && patientMatch && doctorMatch && timeMatch
        })
    }

    const filterDoctors = (doctors) => {
        return doctors.filter((doctor) => {
            const firstNameMatch = doctorFilters.firstName === '' || (doctor.firstName).toLowerCase().includes((doctorFilters.firstName).toLowerCase())
            const lastNameMatch = doctorFilters.lastName === '' || (doctor.lastName).toLowerCase().includes((doctorFilters.lastName).toLowerCase())
            const specialitytMatch = !doctorFilters.speciality || doctor.speciality.toLowerCase().includes(doctorFilters.speciality.toLowerCase())
            const workDaysMatch = !doctorFilters.workDays || doctor.workDays.some((day) => day.toLowerCase().includes(doctorFilters.workDays.toLowerCase()))
            const hoursMatch = !doctorFilters.hours || doctor.hours.toString().toLowerCase().includes(doctorFilters.hours.toString().toLowerCase())
            return firstNameMatch && lastNameMatch && specialitytMatch && workDaysMatch && hoursMatch
        })
    }

    const filterPatients = (patients) => {
        return patients.filter((patient) => {
            const firstNameMatch = patientFilters.firstName === '' || (patient.firstName).toLowerCase().includes((patientFilters.firstName).toLowerCase())
            const lastNameMatch = patientFilters.lastName === '' || (patient.lastName).toLowerCase().includes((patientFilters.lastName).toLowerCase())
            const birthDatetMatch = !patientFilters.birthDate || patient.birthDate.toLowerCase().includes(patientFilters.birthDate.toLowerCase())
            const genreMatch = !patientFilters.genre || patient.genre.toLowerCase().includes(patientFilters.genre.toLowerCase())
            return firstNameMatch && lastNameMatch && birthDatetMatch && genreMatch
        })
    }



    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Add Admin
                </button>
            </header>

            <main className="flex-1 p-6">
                <div className="flex flex-col gap-6">
                    <div>
                        <h2 className="text-lg font-bold mb-4">Appointments</h2>
                        <h2 className="text-lg font-bold mb-4">Search by:</h2>
                        <div className='flex flex-col gap-2 mb-4 w-[330px]'>
                            <label className='font-semibold flex gap-2 justify-between'>
                                Date:
                                <input className='border-2 rounded-lg px-2' type="text" value={appointmentsFilters.date} onChange={(e) => setAppointmentsFilters({ ...appointmentsFilters, date: e.target.value })} />
                            </label>
                            <label className='font-semibold flex gap-2 justify-between'>
                                Patient:
                                <input className='border-2 rounded-lg px-2' type="text" value={appointmentsFilters.patient} onChange={(e) => setAppointmentsFilters({ ...appointmentsFilters, patient: e.target.value })} />
                            </label>
                            <label className='font-semibold flex gap-2 justify-between'>
                                Doctor:
                                <input className='border-2 rounded-lg px-2' type="text" value={appointmentsFilters.doctor} onChange={(e) => setAppointmentsFilters({ ...appointmentsFilters, doctor: e.target.value })} />
                            </label>
                            <label className='font-semibold flex gap-2 justify-between'>
                                Hour:
                                <input className='border-2 rounded-lg px-2' type="text" value={appointmentsFilters.time} onChange={(e) => setAppointmentsFilters({ ...appointmentsFilters, time: e.target.value })} />
                            </label>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Date</th>
                                    <th className="border px-4 py-2">Time</th>
                                    <th className="border px-4 py-2">Patient</th>
                                    <th className="border px-4 py-2">Doctor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterAppointments(listAppointments)?.map(appointment => (
                                    <tr key={appointment.id}>
                                        <td className="border px-4 py-2">{appointment.date}</td>
                                        <td className="border px-4 py-2">{appointment.time}</td>
                                        <td className="border px-4 py-2">{appointment.patient}</td>
                                        <td className="border px-4 py-2">{appointment.doctor}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Add Appointment</button>
                        <hr className='my-4 border-2'/>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold mb-4">Doctors</h2>
                        <h2 className="text-lg font-bold mb-4">Search by:</h2>
                        <div className='flex flex-col gap-2 mb-4 w-[330px]'>
                            <label className='font-semibold flex gap-2 justify-between'>
                            First Name:
                                <input className='border-2 rounded-lg px-2' type="text" value={doctorFilters.firstName} onChange={(e) => setDoctorFilters({ ...doctorFilters, firstName: e.target.value })} />
                            </label>
                            <label className='font-semibold flex gap-2 justify-between'>
                            Last Name:
                                <input className='border-2 rounded-lg px-2' type="text" value={doctorFilters.lastName} onChange={(e) => setDoctorFilters({ ...doctorFilters, lastName: e.target.value })} />
                            </label>
                            <label className='font-semibold flex gap-2 justify-between'>
                            Specialty:
                                <input className='border-2 rounded-lg px-2' type="text" value={doctorFilters.speciality} onChange={(e) => setDoctorFilters({ ...doctorFilters, speciality: e.target.value })} />
                            </label>
                            <label className='font-semibold flex gap-2 justify-between'>
                                Work Day:
                                <input className='border-2 rounded-lg px-2' type="text" value={doctorFilters.workDays} onChange={(e) => setDoctorFilters({ ...doctorFilters, workDays: e.target.value })} />
                            </label>
                            <label className='font-semibold flex gap-2 justify-between'>
                                Schedules:
                                <input className='border-2 rounded-lg px-2' type="text" value={doctorFilters.hours} onChange={(e) => setDoctorFilters({ ...doctorFilters, hours: e.target.value })} />
                            </label>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2 max-[767px]:hidden">Specialty</th>
                                    <th className="border px-4 py-2 min-[768px]:hidden">Spec</th>
                                    <th className="border px-4 py-2 max-[767px]:hidden">Work Days</th>
                                    <th className="border px-4 py-2 min-[768px]:hidden">Days</th>
                                    <th className='border px-4 py-2 max-[767px]:hidden'>Schedules</th>
                                    <th className='border px-4 py-2 min-[768px]:hidden'>Sche</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterDoctors(listDoctors)?.map(doctor => (
                                    <tr key={doctor.id}>
                                        <td className="border px-4 py-2">{doctor.firstName} {doctor.lastName}</td>
                                        <td className="border px-4 py-2 text-xs max-[767px]:hidden">{doctor.speciality}</td>
                                        <td className="border px-4 py-2 text-xs min-[768px]:hidden">{(doctor.speciality).slice(0, 3)}</td>
                                        <td className="border px-4 py-2 text-xs max-[767px]:hidden">{(doctor.workDays).join(', ')}</td>
                                        <td className="border px-4 py-2 text-xs min-[768px]:hidden">{doctor.workDays.map(day => day.slice(0, 3)).join(', ')}</td>
                                        <td className='border px-4 py-2 text-xs max-[767px]:hidden'>{(doctor.hours).join(', ')}</td>
                                        <td className='border px-4 py-2 text-xs min-[768px]:hidden'>{(doctor.hours).join(', ')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                            Add Doctor
                        </button>
                        <hr className='my-4 border-2'/>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold mb-4">Patients</h2>
                        <h2 className="text-lg font-bold mb-4">Search by:</h2>
                        <div className='flex flex-col gap-2 mb-4 w-[330px]'>
                            <label className='font-semibold flex gap-2 justify-between'>
                            First Name:
                                <input className='border-2 rounded-lg px-2' type="text" value={patientFilters.firstName} onChange={(e) => setPatientFilters({ ...patientFilters, firstName: e.target.value })} />
                            </label>
                            <label className='font-semibold flex gap-2 justify-between'>
                            Last Name:
                                <input className='border-2 rounded-lg px-2' type="text" value={patientFilters.lastName} onChange={(e) => setPatientFilters({ ...patientFilters, lastName: e.target.value })} />
                            </label>
                            <label className='font-semibold flex gap-2 justify-between'>
                            BirthDate:
                                <input className='border-2 rounded-lg px-2' type="text" value={patientFilters.birthDate} onChange={(e) => setPatientFilters({ ...patientFilters, birthDate: e.target.value })} />
                            </label>
                            <label className='font-semibold flex gap-2 justify-between'>
                                Genre:
                                <input className='border-2 rounded-lg px-2' type="text" value={patientFilters.genre} onChange={(e) => setPatientFilters({ ...patientFilters, genre: e.target.value })} />
                            </label>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">BirthDate</th>
                                    <th className="border px-4 py-2">Genre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterPatients(listPatients)?.map(patient => (
                                    <tr key={patient.id}>
                                        <td className="border px-4 py-2">{patient.firstName} {patient.lastName}</td>
                                        <td className="border px-4 py-2">{patient.birthDate}</td>
                                        <td className="border px-4 py-2">{patient.genre}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                            Add Patient
                        </button>
                        <hr className='my-4 border-2'/>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold mb-4">Admins</h2>
                        <ul className="bg-gray-200 rounded-lg p-4">
                            <li className="py-2">Admin 1</li>
                            <li className="py-2">Admin 2</li>
                            <li className="py-2">Admin 3</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AdminPanel