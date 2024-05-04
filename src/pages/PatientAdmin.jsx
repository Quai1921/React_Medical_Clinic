import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import Patient from "../components/Patient"
import axios from "axios"
import HeaderAdmin from "../components/HeaderAdmin"
import FooterAdmin from "../components/FooterAdmin"


const PatientsAdmin = () => {

    
    const [patients, setPatients] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    const [patientFilters, setPatientFilters] = useState({
        lastName: '',
        email: ''
    })


    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {

        const token = localStorage.getItem("token")
        axios.get("/api/patient/all",
        {headers: {
            'Authorization': "Bearer " + token}})
        .then(res => setPatients(res.data))
        .catch(err => {
            // console.log(err.response.data)
        })
    }, [])

    const filterPatients = (patients) => {
        return patients.filter((patient) => {
            const lastNameMatch = patientFilters.lastName === '' || (patient.lastName).toLowerCase().includes((patientFilters.lastName).toLowerCase())
            const emailMatch = patientFilters.email === '' || (patient.email).toLowerCase().includes((patientFilters.email).toLowerCase())
            return emailMatch && lastNameMatch
        })
    }



    return (
        <div className="flex flex-col w-full min-h-dvh">

            <HeaderAdmin/>


            <main className='w-full flex flex-col flex-1 items-center'>
                <div className='flex flex-wrap justify-center items-center w-full'>
                    <img className='md:w-full object-cover object-center' src="/BannerAdmin.png" alt="Image a doctor" />
                </div>    

                <h1 className="text-center font-bold text-5xl mt-4 text-[#F19E22]">PATIENTS</h1>
                
                <div className='flex flex-col gap-2 mb-4 w-[330px] mt-8'>
                    <label className='font-semibold flex gap-2 justify-between text-blue-800'>
                    Last Name:
                        <input className='border-2 border-blue-800 rounded-lg px-2' type="text" value={patientFilters.lastName} onChange={(e) => setPatientFilters({ ...patientFilters, lastName: e.target.value })} />
                    </label>
                    <label className='font-semibold flex gap-2 justify-between text-blue-800'>
                        Email:
                        <input className='border-2 border-blue-800 rounded-lg px-2' type="text" value={patientFilters.email} onChange={(e) => setPatientFilters({ ...patientFilters, email: e.target.value })} />
                    </label>
                </div>
                
                <div className="bg-blue-200 w-11/12 min-h-[200px] max-h-[400px] mt-2 flex flex-col gap-y-2 md:w-4/5 text-sm lg:w-1/2 overflow-y-scroll p-1 mb-4 rounded border-2 border-blue-800">
                    <div className="w-full bg-blue-800 gap-x-1 text-center items-center md:text-lg font-bold flex">
                    <p className="w-1/4 text-white text-left pl-2">NAME</p>
                    <p className="w-2/4 text-white text-left pl-2">EMAIL</p>
                    </div>
                    {filterPatients(patients)?.map(patient => {
                    return <Patient key={patient.id} name={patient.firstName + " " + patient.lastName} email={patient.email} birthDate={patient.birthDate} id={patient.id}/>
                    })}
                </div>
            </main>

            <FooterAdmin/>
        </div>
    )
}

export default PatientsAdmin