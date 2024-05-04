import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {SPECIALITIES} from '../utils/linksSpecialities'
import HeaderAdmin from '../components/HeaderAdmin'
import FooterAdmin from '../components/FooterAdmin'

const RegisterDoctor = () => {

    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const genreRef = useRef(null)
    const specialityRef = useRef(null)
    const workDaysRef = useRef(null)
    const hoursRef = useRef(null)


    const formRef = useRef(null)


    const [register, setRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        genre: "",
        speciality: "",
        workDays: "",
        hours: "",
    })


    const [firstNameEntered, setFirstNameEntered] = useState(false)
    const [lastNameEntered, setLastNameEntered] = useState(false)
    const [emailEntered, setEmailEntered] = useState(false)
    const [emailCharacters, setEmailCharacters] = useState(false)
    const [emailExist, setEmailExist] = useState(false)
    const [emailInvalid, setEmailInvalid] = useState(false)
    const [passwordEntered, setPasswordEntered] = useState(false)
    const [genreEntered, setGenreEntered] = useState(false)
    const [passwordLength, setPasswordLength] = useState(false)
    const [registerSuccess, setRegisterSuccess] = useState(false)
    const [workDaysLegend, setWorkDaysLegend] = useState(false)
    const [hoursLegend, setHoursLegend] = useState(false)
    const [specialityLegend, setSpecialityLegend] = useState(false)



    function handleInput(e) {
        const value = e.target.name === 'genre' ? e.target.value.toUpperCase()  : e.target.value
        return setRegister({
            ...register,
            [e.target.name]: value,
            
        })
    }

    // useEffect(() => {
    //     axios.get("/api/doctor/specialities")
    //     .then(response => {
    //         setSpecialities(response.data)
    //     })
    //     .catch(error => console.log(error.response.data))
    // }, [])

    
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        let firstNameValid = true
        let lastNameValid = true
        let emailValid = true
        let passwordValid = true
        let genreValid = true

        const token = localStorage.getItem("token")

        if (firstNameRef.current.value == "") {
            setFirstNameEntered(true)
            firstNameValid = false
        }

        if (lastNameRef.current.value == "") {
            setLastNameEntered(true)
            lastNameValid = false
        }

        if (emailRef.current.value == "") {
            setEmailEntered(true)
            emailValid = false
        }

        if(!emailRef.current.value.includes("@doctor") && emailRef.current.value != "") {
            setEmailInvalid(true)
            emailValid = false
        }

        // if (!emailRef.current.value.includes("@") && emailRef.current.value != "") {
        //     setEmailCharacters(true)
        //     emailValid = false
        // }



        if (passwordRef.current.value == "") {
            setPasswordEntered(true)
            passwordValid = false
        }

        if (passwordRef.current.value.length < 6 && passwordRef.current.value != "") {
            setPasswordLength(true)
            passwordValid = false
        }

        if (genreRef.current.value == "") {
            setGenreEntered(true)
            genreValid = false
        }

        if(workDaysTest.length == 0){
            setWorkDaysLegend(true)
        }else{
            setWorkDaysLegend(false)
        }

        if(hoursTest.length == 0){
            setHoursLegend(true)
        }else{
            setHoursLegend(false)
        }

        if(specialityRef.current.value == ""){
            setSpecialityLegend(true)
        }else{
            setSpecialityLegend(false)
        }
        
        

        if (firstNameValid && lastNameValid && emailValid && passwordValid && genreValid) {
            const register = {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                genre: genreRef.current.value.toUpperCase(),
                speciality: specialityRef.current.value,
                workDays: workDaysTest,
                hours: hoursTest
            }
            axios.post("/api/doctor/register", register,
            {headers: {Authorization: "Bearer " + token}})
                .then(response => {
                    // console.log(register)
                    // console.log(response.data)
                    // console.log(response.status)
                    if (response.status === 201) {
                        setRegisterSuccess(true)
                        setRegister({
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                            genre: "",
                            speciality: "",
                            workDays: "",
                            hours: "",
                        })
                        formRef.current.reset()
                    }
                })
                .catch(error => {
                    // console.log(error.response.data)
                    if(error.response.data == "Already exist a doctor with that email"){
                        setEmailExist(true)
                        document.querySelectorAll("[name='workDays']").forEach(element => {
                            if(element.checked == true){
                                element.checked = false
                                workDaysTest = []
                            }})
                            document.querySelectorAll("[name='hours']").forEach(element => {
                                if(element.checked == true){
                                    element.checked = false
                                    hoursTest = []
                                }})
                    }
                })
        }else{
            document.querySelectorAll("[name='workDays']").forEach(element => {
                if(element.checked == true){
                    element.checked = false
                    workDaysTest = []
                }
            })
            document.querySelectorAll("[name='hours']").forEach(element => {
                if(element.checked == true){
                    element.checked = false
                    hoursTest = []
                }
            })
        }
    }


    function handleSelectChange(e) {

        if (e.target.name === "firstName") {
            setFirstNameEntered(false)
            setRegisterSuccess(false)
        }

        if(e.target.name === "lastName") {
            setLastNameEntered(false)
            setRegisterSuccess(false)
        }

        if(e.target.name === "email") {
            setEmailEntered(false)
            setEmailCharacters(false)
            setEmailExist(false)
            setEmailInvalid(false)
            setRegisterSuccess(false)

        }

        if(e.target.name === "password") {
            setPasswordEntered(false)
            setPasswordLength(false)
            setRegisterSuccess(false)
        }

        if(e.target.name === "genre") {
            setGenreEntered(false)
            setRegisterSuccess(false)
        }

        if(e.target.name === "birthDate") {
            setBirthDateEntered(false)
            setRegisterSuccess(false)
        }
    }

    function handleSuccess() {
        setRegisterSuccess(false)
    }

    // function handleCheckboxChange(e) {
    //     setIsChecked(!isChecked)
    //     setisNotChecked(false)
    // }

    let workDaysTest = []

    function checkboxWorkDays(e){
        if(e.target.checked == true) {
            workDaysTest.push(e.target.value)
        }
        else{
            workDaysTest = workDaysTest.filter(element => element !== e.target.value)
        }
        // console.log(workDaysTest)
    }

    let hoursTest = []

    function checkboxHour(e){
        if(e.target.checked == true) {
            hoursTest.push(e.target.value)
        }
        else{
            hoursTest = hoursTest.filter(element => element !== e.target.value)
        }
        // console.log(hoursTest)
    }




    // console.log(register)



    return (
    <div className='flex flex-col w-full min-h-dvh'>
        
        <HeaderAdmin />

        <main className='w-full flex flex-col flex-1'>
            <div className='flex flex-wrap justify-center items-center'>
                <img className='md:w-1/2' src="/Register.jpg" alt="Image a doctor" />

                <form ref={formRef} className='flex flex-col justify-center items-center gap-4 lg:gap-6 p-8 md:w-1/2' onSubmit={handleSubmit}>
                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/FirstName.png" alt="" />
                            <input type="text" name="firstName" ref={firstNameRef} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='First Name' autoComplete='username' onFocus={handleSelectChange} onInput={handleInput}/>
                            {firstNameEntered && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please enter your first name</p>}
                        </fieldset>
                        
                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/LastName.png" alt="" />
                            <input type="text" name="lastName" ref={lastNameRef} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='Last Name' autoComplete='username' onFocus={handleSelectChange} onInput={handleInput}/>
                            {lastNameEntered && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please enter your last name</p>}
                        </fieldset>

                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/UserMail.png" alt="" />
                            <input type="mail" name="email" ref={emailRef} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='Email' autoComplete='username' onFocus={handleSelectChange} onInput={handleInput}/>
                            {emailEntered && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please enter your email</p>}
                            {emailCharacters && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Entered a valid email</p>}
                            {emailExist && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Invalid email entered</p>}
                            {emailInvalid && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>The email has to contain @doctor</p>}
                        </fieldset>
                        
                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/Padlock.png" alt="" />
                            <input type="password" name="password" ref={passwordRef} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='Password' autoComplete="current-password" onFocus={handleSelectChange} onInput={handleInput}/>
                            {passwordEntered && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please enter your password</p>}
                            {passwordLength && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Password must be at least 6 characters</p>}
                        </fieldset>

                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/Genre.png" alt="" />
                            <select name="genre" ref={genreRef} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" onInput={handleInput} onFocus={handleSelectChange}>
                                <option value="">Select your genre please...</option>
                                <option value="male">MALE</option>
                                <option value="female">FEMALE</option>
                                <option value="other">OTHER</option>
                            </select>
                            {genreEntered && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please enter your genre</p>}
                        </fieldset>

                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/Speciality.png" alt="" />
                            <select name="speciality" ref={specialityRef} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" onInput={handleInput} onFocus={handleSelectChange}>
                                <option value="">Select an speciality...</option>
                                {SPECIALITIES?.map((speciality) => (
                                    <option key={speciality} value={speciality}>{speciality}</option>
                                ))}
                            </select>
                            {specialityLegend && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please select the speciality</p>}
                        </fieldset>

                        <fieldset className='flex justify-center items-center gap-3 relative' ref={workDaysRef}>
                            <img className='w-8' src="/CalendarAppointment.png" alt="" />
                            <div className='flex flex-col'>
                            <p className='font-bold text-[#F19E22] ml-2'>WORK DAYS</p>
                            <div className='flex flex-wrap w-[300px] px-4 border-2 border-[#F19E22] rounded-xl py-2'>
                                <div className='w-1/2 flex justify-between items-center gap-x-2 px-2'>
                                <label className='text-left w-1/2'>Monday</label>
                                <input className='w-[14px] h-[14px]' type='checkbox' value="MONDAY" name='workDays' onChange={checkboxWorkDays}></input>
                                </div>
                                <div className='w-1/2 flex justify-between items-center gap-x-2 px-2'>
                                <label className='text-left w-1/2'>Tuesday</label>
                                <input className='w-[14px] h-[14px]' type='checkbox' value="TUESDAY" name='workDays' onChange={checkboxWorkDays}></input>
                                </div>
                                <div className='w-1/2 flex justify-between items-center gap-x-2 px-2'>
                                <label className='text-left w-1/2'>Wednesday</label>
                                <input className='w-[14px] h-[14px]' type='checkbox' value="WEDNESDAY" name='workDays' onChange={checkboxWorkDays}></input>
                                </div>
                                <div className='w-1/2 flex justify-between items-center gap-x-2 px-2'>
                                <label className='text-left w-1/2'>Thursday</label>
                                <input className='w-[14px] h-[14px]' type='checkbox' value="THURSDAY" name='workDays' onChange={checkboxWorkDays}></input>
                                </div>
                                <div className='w-1/2 flex justify-between items-center gap-x-2 px-2'>
                                <label className='text-left w-1/2'>Friday</label>
                                <input className='w-[14px] h-[14px]' type='checkbox' value="FRIDAY" name='workDays' onChange={checkboxWorkDays}></input>
                                </div>
                                <div className='w-1/2 flex justify-between items-center gap-x-2 px-2'>
                                <label className='text-left w-1/2'>Saturday</label>
                                <input className='w-[14px] h-[14px]' type='checkbox' value="SATURDAY" name='workDays' onChange={checkboxWorkDays}></input>
                                </div>
                                <div className='w-1/2 flex justify-between items-center gap-x-2 px-2'>
                                <label className='text-left w-1/2'>Sunday</label>
                                <input className='w-[14px] h-[14px]' type='checkbox' value="SUNDAY" name='workDays' onChange={checkboxWorkDays}></input>
                                </div>
                                {workDaysLegend && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please select the work days</p>}
                            </div>
                            </div>
                        </fieldset>

                        <fieldset className='flex justify-center items-center gap-3 relative' ref={hoursRef}>
                            <img className='w-8' src="/WatchBlue.png" alt="" />
                            <div className='flex flex-col'>
                            <p className='font-bold text-[#F19E22] ml-2'>WORK HOURS</p>
                            <div className='flex flex-wrap w-[300px] px-4 border-2 border-[#F19E22] rounded-xl py-2'>
                                <div className='w-1/3 flex justify-center items-center gap-x-2'>
                                <label className='text-center'>08:00</label>
                                <input type='checkbox' value="8" name='hours' onChange={checkboxHour}></input>
                                </div>
                                <div className='w-1/3 flex justify-center items-center gap-x-2'>
                                <label>09:00</label>
                                <input type='checkbox' value="9" name='hours' onChange={checkboxHour}></input>
                                </div>
                                <div className='w-1/3 flex justify-center items-center gap-x-2'>
                                <label>10:00</label>
                                <input type='checkbox' value="10" name='hours' onChange={checkboxHour}></input>
                                </div>
                                <div className='w-1/3 flex justify-center items-center gap-x-2'>
                                <label>11:00</label>
                                <input type='checkbox' value="11" name='hours' onChange={checkboxHour}></input>
                                </div>
                                <div className='w-1/3 flex justify-center items-center gap-x-2'>
                                <label>12:00</label>
                                <input type='checkbox' value="12" name='hours' onChange={checkboxHour}></input>
                                </div>
                                <div className='w-1/3 flex justify-center items-center gap-x-2'>
                                <label>15:00</label>
                                <input type='checkbox' value="15" name='hours' onChange={checkboxHour}></input>
                                </div>
                                <div className='w-1/3 flex justify-center items-center gap-x-2'>
                                <label>16:00</label>
                                <input type='checkbox' value="16" name='hours' onChange={checkboxHour}></input>
                                </div>
                                <div className='w-1/3 flex justify-center items-center gap-x-2'>
                                <label>17:00</label>
                                <input type='checkbox' value="17" name='hours' onChange={checkboxHour}></input>
                                </div>
                                <div className='w-1/3 flex justify-center items-center gap-x-2'>
                                <label>18:00</label>
                                <input type='checkbox' value="18" name='hours' onChange={checkboxHour}></input>
                                </div>
                                {hoursLegend && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please select the work hours</p>}
                            </div>
                            </div>
                        </fieldset>
                        
                        <div className='relative'>
                            <input type="submit" value="Register Doctor" className='bg-[#F19E22] rounded-xl py-2 px-1 hover:bg-[#dc901e] w-[180px] text-center font-bold text-white cursor-pointer'/>
                            {registerSuccess && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                    <p className='text-green-600 font-bold text-lg'>Registered successfully!</p>
                                    <div className="flex justify-center gap-4 mt-6">
                                        <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-md w-[120px]" onClick={handleSuccess}>Continue</button>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                </form>
            </div>
            
        </main>


        <FooterAdmin/>


    </div>
    )
    
}

export default RegisterDoctor