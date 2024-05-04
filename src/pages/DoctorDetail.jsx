import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import authActions from '../redux/actions/auth.actions.js'
import { useParams } from 'react-router-dom'
import HeaderAdmin from '../components/HeaderAdmin.jsx'
import FooterAdmin from '../components/FooterAdmin.jsx'

const DoctorDetail = () => {

    const [doctors, setDoctors] = useState([])
    // console.log(doctors)

    let user = {

    }

    const [users, setUsers] = useState([])

    const params = useParams()



    const { login, current } = authActions
    const dispatch = useDispatch()

    useEffect(() => {

            const token = localStorage.getItem("token")
        
            axios.get("/api/doctor/all", {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
                .then(res => {
                    // dispatch(current(res.data))
                    // console.log(res.data)
                    setUsers(res.data)

                    
                })
                .catch(err => {
                    // console.log(err)
                })
        

    }, [])

    // console.log(users)
    user = users?.find(user => user.id == params.id)

    // console.log(params.id)

    // console.log(user)

    // useEffect(() => {
    //     axios.get('/api/doctor/all')
    //         .then(response => {
    //             setDoctors(response.data)
    //         })
    //         .catch(error => console.log(error))
    // }, [])

    // const findDoctorSpecialty = (doctorName) => {
    //     const doctor = doctors.find(doc => doc.firstName + ' ' + doc.lastName === doctorName)
    //     // console.log(doctor)
    //     return doctor ? doctor.speciality : ''
    // }


    return (
        <>
            <HeaderAdmin/>

            <main className='flex flex-col gap-6 items-center py-4 h-screen'>
                
                <section className='flex flex-col items-center'>    
                    <h1 className='text-2xl text-[#06A9B2] font-semibold py-4 text- center'>Doctor</h1>
                    <article className='w-[300px]'>
                        <p className='font-semibold text-lg'>ID: <span className='font-normal'>{user?.id}</span></p>
                        <p className='font-semibold text-lg'>NAME: <span className='font-normal'>{user?.firstName} {user?.lastName}</span></p>
                        <p className='font-semibold text-lg'>GENRE: <span className='font-normal'>{user?.genre}</span></p>
                        <p className='font-semibold text-lg'>EMAIL: <span className='font-normal'>{user?.email}</span></p>
                        <p className='font-semibold text-lg'>SPECIALITY: <span className='font-normal'>{user?.speciality}</span></p>
                        <p className='font-semibold text-lg'>WORK DAYS: <span className='font-normal'>{user?.workDays.join(', ')}</span></p>
                        <p className='font-semibold text-lg'>HOURS: <span className='font-normal'>{user?.hours.join(' hs. - ')}</span></p>

                    </article>
                </section>


                <section className='flex flex-col items-center'>
                    <h2 className='text-2xl text-[#06A9B2] font-semibold py-4 text- center'>Appoiments</h2>
                    <table className='bg-stone-800 flex flex-col p-3 rounded-lg w-[369px] md:w-[600px]'>
                        <thead className='text-neutral-400 border-b-2 border-neutral-300'>
                            <tr className='flex pb-4 justify-center'>
                                <th className='w-[20%] text-left'>Patient</th>
                                <th className='w-[30%] text-center'>Date</th>
                                <th className='w-[15%] text-right'>Hour</th>
                            </tr>
                        </thead>
                        <tbody className='text-white flex flex-col'>
                            {user?.appointments
                            ?.toSorted((a, b) => new Date(a.date) - new Date(b.date))
                            ?.map(appointment => (
                                <tr key={appointment.id} className='flex py-4 justify-center text-center text-sm'>
                                    <td className='w-[20%] text-left'>{appointment.patient}</td>
                                    <td className='w-[30%] text-center'>{appointment.date}</td>
                                    <td className='w-[15%] text-right'>{appointment.time} hs.</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>

            <FooterAdmin/>
        </>
        
    )
}

export default DoctorDetail