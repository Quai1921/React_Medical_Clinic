import { useState, useEffect } from "react"
import axios from "axios"
import Doctor from "../components/Doctor"
import HeaderAdmin from "../components/HeaderAdmin"
import FooterAdmin from "../components/FooterAdmin"

const DoctorAdmin = () => {

    const [doctors, setDoctors] = useState([])

    const [doctorFilters, setDoctorFilters] = useState({
        lastName: '',
        speciality: '',
    })


    useEffect(() => {
        axios.get("/api/doctor/all")
        .then(res => setDoctors(res.data))
        .catch(err => {
            // console.log(err.response.data)
        })
    }, [])

    // console.log(doctors)


    const filterDoctors = (doctors) => {
        return doctors.filter((doctor) => {
            const lastNameMatch = doctorFilters.lastName === '' || (doctor.lastName).toLowerCase()?.includes((doctorFilters.lastName)?.toLowerCase())
            const specialitytMatch = !doctorFilters.speciality || doctor.speciality.toLowerCase().includes(doctorFilters.speciality.toLowerCase())
            return lastNameMatch && specialitytMatch
        })
    }

    return(
        <>
            <div className='flex flex-col w-full min-h-dvh'>
                
            <HeaderAdmin/>

            <main className='w-full flex flex-col flex-1 items-center'>
                <div className='flex flex-wrap justify-center items-center w-full'>
                    <img className='md:w-full object-cover object-center' src="/BannerAdmin.png" alt="Image a doctor" />
                </div>    

                <h1 className="text-center font-bold text-5xl mt-4 text-[#F19E22]">DOCTORS</h1>

                <div className='flex flex-col gap-2 mb-4 w-[330px] mt-8'>
                            <label className='font-semibold flex gap-2 justify-between text-blue-800'>
                            Last Name:
                                <input className='border-2 border-blue-800 rounded-lg px-2' type="text" value={doctorFilters.lastName} onChange={(e) => setDoctorFilters({ ...doctorFilters, lastName: e.target.value })} />
                            </label>
                            <label className='font-semibold flex gap-2 justify-between  text-blue-800'>
                            Specialty:
                                <input className='border-2 border-blue-800 rounded-lg px-2' type="text" value={doctorFilters.speciality} onChange={(e) => setDoctorFilters({ ...doctorFilters, speciality: e.target.value })} />
                            </label>
                        </div>
                
                <div className="bg-blue-200 w-11/12 min-h-[200px] max-h-[400px] mt-2 flex flex-col gap-y-2 lg:w-3/4 text-sm overflow-y-scroll p-1 mb-4 rounded border-2 border-blue-800">
                <div className="w-full bg-blue-800 gap-x-1 text-center items-center md:text-lg font-bold flex">
                    <p className="w-1/5 text-white text-left pl-2">NAME</p>
                    <p className="w-1/3 text-white text-left pl-2">EMAIL</p>
                    <p className="w-1/5 text-white text-left pl-2 max-[550px]:pl-6">SPECIALITY</p>
                    <p className="w-1/5"></p>
                </div>

                {filterDoctors(doctors)?.map(doctor => {
                    return <Doctor key={doctor.id} id={doctor.id} name={doctor.firstName + " " + doctor.lastName} email={doctor.email} speciality={doctor.speciality}/>
                })}

                </div>
            </main>

            <FooterAdmin/>

            </div>
        </>
    )
}

export default DoctorAdmin