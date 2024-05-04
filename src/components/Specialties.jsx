import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Specialties = () => {
    const [doctors, setDoctors] = useState([])
    const [selectedSpecialty, setSelectedSpecialty] = useState('')

    useEffect(() => {
        axios.get('/api/doctor/all')
            .then(response => {
                setDoctors(response.data)
            })
            .catch(error => {
                // console.log(error)
            })
    }, [])


    const filterDoctorsBySpecialty = (specialty) => {
        // Si la especialidad seleccionada es la misma que la actual, eliminamos la selección
        if (selectedSpecialty === specialty) {
            setSelectedSpecialty(null)
        } else {
            setSelectedSpecialty(specialty)
        }
    }
    

    const filteredDoctors = doctors.filter(doctor => {
        if (!selectedSpecialty) return true // Cuando no hay una especialidad seleccionada, devuelve true para todos los doctores
        switch (selectedSpecialty.toLowerCase()) {
            case 'corazon':
                return doctor.speciality.toUpperCase() === 'CARDIOLOGIST'
            case 'nino':
                return doctor.speciality.toUpperCase() === 'PEDIATRICIAN'
            case 'cerebro':
                return doctor.speciality.toUpperCase() === 'NEUROLOGIST'
            case 'utero':
                return doctor.speciality.toUpperCase() === 'GYNECOLOGIST'
            case 'neumologia':
                return doctor.speciality.toUpperCase() === 'PULMONOLOGIST'
            case 'hueso':
                return doctor.speciality.toUpperCase() === 'TRAUMATOLOGIST'
            case 'estomago':
                return doctor.speciality.toUpperCase() === 'GASTROENTEROLOGIST'
            default:
                return false
        }
    })

    const getBackgroundImage = (specialty) => {
        const isSelected = selectedSpecialty === specialty
        const baseImagePath = "/"
    
        switch (specialty) {
            case 'corazon':
                return isSelected ? `${baseImagePath}corazonOrange.png` : `${baseImagePath}corazon.png`
            case 'nino':
                return isSelected ? `${baseImagePath}ninoOrange.png` : `${baseImagePath}nino.png`
            case 'cerebro':
                return isSelected ? `${baseImagePath}cerebroOrange.png` : `${baseImagePath}cerebro.png`
            case 'utero':
                return isSelected ? `${baseImagePath}uteroOrange.png` : `${baseImagePath}utero.png`
            case 'neumologia':
                return isSelected ? `${baseImagePath}neumologiaOrange.png` : `${baseImagePath}neumologia.png`
            case 'hueso':
                return isSelected ? `${baseImagePath}huesoOrange.png` : `${baseImagePath}hueso.png`
            case 'estomago':
                return isSelected ? `${baseImagePath}estomagoOrange.png` : `${baseImagePath}estomago.png`
            default:
                return `${baseImagePath}defaultImage.png`
        }
    }
    

    // console.log(filteredDoctors)
    // console.log(selectedSpecialty)

    // console.log(doctors.map(doctor => doctor.id))


    return (
        <main className='flex flex-col py-6'>
            <section className='flex flex-col items-center gap-8'>
                <h1 className='text-3xl text-[#06A9B2] font-semibold'>Specialties</h1>
                <p className='text-center px-2'>Click on the specialty you are looking for to view the medical history.</p>
                <article className='flex flex-wrap gap-1 justify-center'>
                    <div className='flex flex-col items-center w-[175px]'>
                        <div className='rounded-full border-2 border-[#F19E22] w-[70px] h-[70px] flex justify-center items-center hover:bg-[#F19E22] ' onClick={() => filterDoctorsBySpecialty('corazon')}>
                            <div style={{ backgroundImage: `url(${getBackgroundImage('corazon')})` }} className='bg-cover bg-center w-[60px] h-[60px] p-2 rounded-full'></div>
                        </div>
                        <p className='font-semibold'>CARDIOLOGIST</p>
                    </div>

                    <div className='flex flex-col items-center w-[175px]'>
                        <div className='rounded-full border-2 border-[#F19E22] w-[70px] h-[70px] flex justify-center items-center hover:bg-[#F19E22]' onClick={() => filterDoctorsBySpecialty('nino')}>
                            <div style={{ backgroundImage: `url(${getBackgroundImage('nino')})` }} className='bg-cover bg-center w-[60px] h-[60px] p-2 rounded-full'></div>
                        </div>
                        <p className='font-semibold'>PEDIATRICIAN</p>
                    </div>

                    <div className='flex flex-col items-center w-[175px]'>
                        <div className='rounded-full border-2 border-[#F19E22] w-[70px] h-[70px] flex justify-center items-center hover:bg-[#F19E22]' onClick={() => filterDoctorsBySpecialty('cerebro')}>
                            <div style={{ backgroundImage: `url(${getBackgroundImage('cerebro')})` }} className='bg-cover bg-center w-[60px] h-[60px] p-2 rounded-full'></div>
                        </div>
                        <p className='font-semibold'>NEUROLOGIST</p>
                    </div>

                    <div className='flex flex-col items-center w-[175px]'>
                        <div className='rounded-full border-2 border-[#F19E22] w-[70px] h-[70px] flex justify-center items-center hover:bg-[#F19E22]' onClick={() => filterDoctorsBySpecialty('utero')}>
                            <div style={{ backgroundImage: `url(${getBackgroundImage('utero')})` }} className='bg-cover bg-center w-[60px] h-[60px] p-2 rounded-full'></div>
                        </div>
                        <p className='font-semibold'>GYNECOLOGIST</p>
                    </div>
                    <div className='flex flex-col items-center w-[175px]'>
                        <div className='rounded-full border-2 border-[#F19E22] w-[70px] h-[70px] flex justify-center items-center hover:bg-[#F19E22]' onClick={() => filterDoctorsBySpecialty('neumologia')}>
                            <div style={{ backgroundImage: `url(${getBackgroundImage('neumologia')})` }} className='bg-cover bg-center w-[60px] h-[60px] p-2 rounded-full'></div>
                        </div>
                        <p className='font-semibold'>PULMONOLOGIST</p>
                    </div>

                    <div className='flex flex-col items-center w-[175px]'>
                        <div className='rounded-full border-2 border-[#F19E22] w-[70px] h-[70px] flex justify-center items-center hover:bg-[#F19E22]' onClick={() => filterDoctorsBySpecialty('hueso')}>
                            <div style={{ backgroundImage: `url(${getBackgroundImage('hueso')})` }} className='bg-cover bg-center w-[60px] h-[60px] p-2 rounded-full'></div>
                        </div>
                        <p className='font-semibold'>TRAUMATOLOGIST</p>
                    </div>

                    <div className='flex flex-col items-center w-[175px]'>
                        <div className='rounded-full border-2 border-[#F19E22] w-[70px] h-[70px] flex justify-center items-center hover:bg-[#F19E22]' onClick={() => filterDoctorsBySpecialty('estomago')}>
                            <div style={{ backgroundImage: `url(${getBackgroundImage('estomago')})` }} className='bg-cover bg-center w-[60px] h-[60px] p-2 rounded-full'></div>
                        </div>
                        <p className='font-semibold'>GASTROENTEROLOGIST</p>
                    </div>
                </article>

                {!selectedSpecialty && (
                    <div className='flex flex-col gap-4 items-center w-3/4'>
                        <h2 className='text-2xl text-[#06A9B2] font-semibold py-4'>Doctors</h2>

                        <div className='flex flex-col gap-4 justify-center md:flex-row flex-wrap'>
                            {doctors.map(doctor => (

                                <Link  key={doctor.id} to='/appointment' state= {{ doctor: doctor }} >
                                    <div className='p-4 border-2 border-[#307275] bg-[#06A9B2] rounded-xl text-center w-[315px]' key={doctor.id}>
                                        <p className='font-semibold text-white'>{doctor.firstName} {doctor.lastName} - {doctor.speciality}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* <Link  key={doctor.id} to='/appointment' state= {{ doctor: doctor }} >Hola</Link> */}

                {selectedSpecialty && (
                    <div className='flex flex-col gap-4 items-center'>
                        <h2 className='text-2xl text-[#06A9B2] font-semibold py-4'>Doctors</h2>

                        {filteredDoctors.map(doctor => (
                            <Link  key={doctor.id} to='/appointment' state= {{ doctor: doctor }} >
                                <div className='p-4 border-2 border-[#307275] bg-[#06A9B2] rounded-xl text-center w-[315px]' key={doctor.id}>
                                    <p className='font-semibold text-white'>{doctor.firstName} {doctor.lastName} - {doctor.speciality}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}



            </section>

        </main>
    )
}

export default Specialties