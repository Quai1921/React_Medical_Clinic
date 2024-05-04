import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import HeaderAdmin from '../components/HeaderAdmin'
import FooterAdmin from '../components/FooterAdmin'

const RegisterAdmin = () => {

    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)


    const formRef = useRef(null)


    const [register, setRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })


    const [firstNameEntered, setFirstNameEntered] = useState(false)
    const [lastNameEntered, setLastNameEntered] = useState(false)
    const [emailEntered, setEmailEntered] = useState(false)
    const [emailCharacters, setEmailCharacters] = useState(false)
    const [emailExist, setEmailExist] = useState(false)
    const [passwordEntered, setPasswordEntered] = useState(false)
    const [passwordLength, setPasswordLength] = useState(false)
    const [registerSuccess, setRegisterSuccess] = useState(false)



    function handleInput(e) {
        const value = e.target.name === 'genre' ? e.target.value.toUpperCase()  : e.target.value
        return setRegister({
            ...register,
            [e.target.name]: value,
            
        })
    }


    function handleSubmit(e) {
        e.preventDefault()
        let firstNameValid = true
        let lastNameValid = true
        let emailValid = true
        let passwordValid = true

        const token = localStorage.getItem('token')

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

        if (!emailRef.current.value.includes("@admin") && emailRef.current.value != "") {
            setEmailCharacters(true)
            emailValid = false
        }

        if (passwordRef.current.value == "") {
            setPasswordEntered(true)
            passwordValid = false
        }

        if (passwordRef.current.value.length < 6 && passwordRef.current.value != "") {
            setPasswordLength(true)
            passwordValid = false
        }

        if (firstNameValid && lastNameValid && emailValid && passwordValid) {
            const register = {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }
            axios.post("/api/admin/register", register,
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
                        })
                        
                        formRef.current.reset()
                    }
                })
                .catch(error => {
                    if(error.response.data == "The email is already registered"){
                        setEmailExist(true)
                    }
                    // console.log(error.response.data)
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

    // let workDaysTest = []

    // function checkboxWorkDays(e){
    //     if(e.target.checked == true) {
    //         workDaysTest.push(e.target.value)
    //     }
    //     else{
    //         workDaysTest = workDaysTest.filter(element => element !== e.target.value)
    //     }
    //     console.log(workDaysTest)   
    // }

    // let hoursTest = []

    // function checkboxHour(e){
    //     if(e.target.checked == true) {
    //         hoursTest.push(e.target.value)
    //     }
    //     else{
    //         hoursTest = hoursTest.filter(element => element !== e.target.value)
    //     }
    //     console.log(hoursTest)   
    // }



    // console.log(register)




    return (
    <div className='flex flex-col w-full min-h-dvh'>

        <HeaderAdmin/>

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
                            {emailEntered && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please enter the email</p>}
                            {emailCharacters && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>The email has to contain @admin</p>}
                            {emailExist && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>The email is already registered</p>}
                        </fieldset>
                        
                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/Padlock.png" alt="" />
                            <input type="password" name="password" ref={passwordRef} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='Password' autoComplete="current-password" onFocus={handleSelectChange} onInput={handleInput}/>
                            {passwordEntered && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please enter your password</p>}
                            {passwordLength && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Password must be at least 6 characters</p>}
                        </fieldset>

                
                        <div className='relative'>
                            <input type="submit" value="Register Admin" className='bg-[#F19E22] rounded-xl py-2 px-1 hover:bg-[#dc901e] w-[180px] text-center font-bold text-white cursor-pointer'/>
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


        <FooterAdmin />

    </div>
    )
    
}



export default RegisterAdmin