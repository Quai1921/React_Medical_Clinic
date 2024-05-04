import React, { useRef, useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import GeneralFooter from '../components/GeneralFooter'
import TermsAndConditions from '../components/TermsAndConditions'
import axios from 'axios'
import GeneralHeader from '../components/GeneralHeader'


function SignUp() {

    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const genreRef = useRef(null)
    const birthDateRef = useRef(null)

    const formRef = useRef(null)


    const [register, setRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        genre: "",
        birthDate: "",
    })


    const [firstNameEntered, setFirstNameEntered] = useState(false)
    const [lastNameEntered, setLastNameEntered] = useState(false)
    const [emailEntered, setEmailEntered] = useState(false)
    const [emailCharacters, setEmailCharacters] = useState(false)
    const [emailExist, setEmailExist] = useState(false)
    const [passwordEntered, setPasswordEntered] = useState(false)
    const [genreEntered, setGenreEntered] = useState(false)
    const [birthDateEntered, setBirthDateEntered] = useState(false)
    const [ageInvalid, setAgeInvalid] = useState(false)
    const [passwordLength, setPasswordLength] = useState(false)
    const [registerSuccess, setRegisterSuccess] = useState(false)

    const [isChecked, setIsChecked] = useState(false)
    const [isNotChecked, setisNotChecked] = useState(false)

    const [termsAndConditions, setTermsAndConditions] = useState(false)

    const [showPassword, setShowPassword] = useState(false)




    function handleInput(e) {
        const value = e.target.name === 'genre' ? e.target.value.toUpperCase()  : e.target.value
        return setRegister({
            ...register,
            [e.target.name]: value,
            
        })
    }

    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        let firstNameValid = true
        let lastNameValid = true
        let emailValid = true
        let passwordValid = true
        let genreValid = true
        let birthDateValid = true


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

        if (!emailRef.current.value.includes("@") && emailRef.current.value != "") {
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

        if (genreRef.current.value == "") {
            setGenreEntered(true)
            genreValid = false
        }

        if (birthDateRef.current.value == "") {
            setBirthDateEntered(true)
            birthDateValid = false
        }

        const today = new Date();
        const birthDate = new Date(birthDateRef.current.value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
        }
        if (age < 18) {
        setAgeInvalid (true);
        birthDateValid = false;
        }

        if(emailRef.current.value.includes("@admin") || emailRef.current.value.includes("@doctor")) {
            setEmailExist(true)
            emailValid = false
        }

        if(!isChecked && firstNameValid && lastNameValid && emailValid && passwordValid) {
            setisNotChecked(true)
        }

        if (firstNameValid && lastNameValid && emailValid && passwordValid && genreValid && birthDateValid && isChecked) {
            const register = {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                genre: genreRef.current.value,
                birthDate: birthDateRef.current.value

            }

            axios.post("/api/patient/register", register)
                .then(response => {
                    console.log(response.data)
                    if (response.status === 200) {
                        setRegisterSuccess(true)
                        setRegister({
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                            genre: "",
                            birthDate: ""
                        })
                        formRef.current.reset()
                    }
                })
                .catch(error => {
                    console.log(error.response.data)
                    if (error.response.data == "There is a patient with that email" || error.response.data == "You can't use that email") {
                        setEmailExist(true)
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
        navigate("/login")
    }

    function handleCheckboxChange() {
        setIsChecked(!isChecked)
        setisNotChecked(false)
    }


    function handleTermsAndConditions() {
        setTermsAndConditions(!termsAndConditions)
    }

    useEffect(() => {
        if (termsAndConditions) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [termsAndConditions])


    function handleShowPassword() {
        setShowPassword(!showPassword)
    }

    console.log(register)
    // console.log(emailExist)





    return (
    <div className='flex flex-col w-full min-h-dvh'>
        
        <GeneralHeader/>

        <main className='w-full flex flex-col flex-1'>
            <div className='flex flex-wrap justify-center items-center'>
                <img className='md:w-1/2' src="/Register.jpg" alt="Image a doctor" />

                <form ref={formRef} className='flex flex-col justify-center items-center gap-4 lg:gap-6 p-8 md:w-1/2' onSubmit={handleSubmit}>
                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/FirstName.png" alt="Icon first name" />
                            <div className='relative flex'>
                                <input type="text" name="firstName" ref={firstNameRef} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='First Name' autoComplete='username' onFocus={handleSelectChange} onInput={handleInput}/>
                            </div>
                            {firstNameEntered && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please enter your first name</p>}
                        </fieldset>
                        
                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/LastName.png" alt="Icon last name" />
                            <div className='relative flex'>
                                <input type="text" name="lastName" ref={lastNameRef} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='Last Name' autoComplete='username' onFocus={handleSelectChange} onInput={handleInput}/>
                            </div>
                            {lastNameEntered && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please enter your last name</p>}
                        </fieldset>

                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/UserMail.png" alt="Icon mail" />
                            <div className='relative flex'>
                                <input type="mail" name="email" ref={emailRef} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='Email' autoComplete='username' onFocus={handleSelectChange} onInput={handleInput}/>
                            </div>
                            {emailEntered && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please enter your email</p>}
                            {emailCharacters && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Entered a valid email</p>}
                            {emailExist && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Invalid email entered</p>}
                        </fieldset>
                        
                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/Padlock.png" alt="Icon password" />
                            <div className='relative flex'>
                                <input type={showPassword ? "text" : "password"} name="password" ref={passwordRef} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='Password' autoComplete="current-password" onFocus={handleSelectChange} onInput={handleInput}/>
                                <img className="w-4 cursor-pointer absolute left-[275px] top-[15px]" src={showPassword ? "/EyeOpen.png" : "/EyeClosed.png"} alt="Toggle password visibility" onClick={handleShowPassword}/>
                            </div>
                            {passwordEntered && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please enter your password</p>}
                            {passwordLength && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Password must be at least 6 characters</p>}
                        </fieldset>

                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/Genre.png" alt="Icon genre" />
                            <div className='relative flex'>
                                <select name="genre" ref={genreRef} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" onInput={handleInput} onFocus={handleSelectChange}>
                                    <option value="">Select your genre please...</option>
                                    <option value="MALE">MALE</option>
                                    <option value="FEMALE">FEMALE</option>
                                    <option value="OTHER">OTHER</option>
                                </select>
                            </div>
                            {genreEntered && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please enter your genre</p>}
                        </fieldset>

                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/BirthDate.png" alt="Icon birthdate" />
                            <div className='relative flex'>
                                <input type="date" name="birthDate" ref={birthDateRef} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" onFocus={handleSelectChange} onInput={handleInput}/>
                            </div>
                            {birthDateEntered && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>Please enter your birthdate</p>}
                            {ageInvalid && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-12'>You must be at least 18 years old</p>}
                        </fieldset>


                        <div className='flex gap-4 items-center relative'>
                            <input type="checkbox" name="termsAndConditions" id="termsAndConditions" onChange={handleCheckboxChange}/>
                            <label htmlFor="termsAndConditions" className='font-semibold italic flex gap-2 items-center justify-center'>I accept the <span className='underline cursor-pointer' onClick={handleTermsAndConditions}>terms and conditions.</span></label>
                            {isNotChecked && (<p className='text-red-600 font-bold text-xs absolute top-5 pl-7'>You must accept terms and conditions.</p>)}
                        </div>
                        
                        
                        <div className='relative'>
                            <input type="submit" value="Sign up" className='bg-[#F19E22] rounded-xl py-2 px-1 hover:bg-[#dc901e] w-[180px] text-center font-bold text-white cursor-pointer'/>
                            {registerSuccess && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                    <p className='text-green-600 font-bold text-lg'>Registered successfully!</p>
                                    <p className="pt-4">Thank you for trusting Serenety Health Center.</p>
                                    <div className="flex justify-center gap-4 mt-6">
                                        <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-md w-[120px]" onClick={handleSuccess}>Continue</button>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>

                        {termsAndConditions && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 px-2" >
                                <div className="bg-white p-6 rounded-lg shadow-md text-left max-w-[700px] max-h-[80vh] overflow-y-auto">
                                    <h5 className='font-bold text-[#06A9B2]'>Terms and Conditions Serenety Health Center</h5>
                                    <h6>Welcome to Serenity Health Center! These Terms and Conditions outline the rules and regulations for the use of Serenity Health Center's Website and services.</h6>
                                    <p className='pt-2'>By accessing this Website and/or registering as a patient at Serenity Health Center, we assume you accept these Terms and Conditions in full. 
                                        Do not continue to use Serenity Health Center's Website or services if you do not accept all of the Terms and Conditions stated on this page.</p>
                                    <h6 className='font-bold'>1. Services</h6>
                                    <p>Serenity Health Center offers a range of medical services including but not limited to consultations, treatments, and procedures. All services are subject to
                                        availability and may be subject to change without notice.</p>
                                    <h6 className='font-bold'>2. Registration</h6>
                                    <p>To access certain services or make appointments at Serenity Health Center, you may be required to register as a patient. You agree to provide accurate, complete, 
                                        and current information during the registration process and to update such information as necessary to maintain its accuracy.</p>
                                    <h6 className='font-bold'>3. Privacy</h6>
                                    <p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and safeguard your personal information.</p>
                                    <h6 className='font-bold'>4. Appointments</h6>
                                    <p>Appointment scheduling is subject to availability. Serenity Health Center reserves the right to reschedule or cancel appointments as necessary. We encourage 
                                        patients to arrive on time for their appointments and to notify us promptly if they are unable to attend.</p>
                                    <h6 className='font-bold'>5. Payments</h6>
                                    <p>Payment for services rendered at Serenity Health Center is due at the time of service unless other arrangements have been made in advance. We accept various 
                                        forms of payment, including cash, credit/debit cards, and insurance payments where applicable.</p>
                                    <h6 className='font-bold'>6. Medical Advice</h6>
                                    <p>The information provided on this Website is for general informational purposes only and should not be construed as medical advice or used as a substitute 
                                        for professional medical diagnosis or treatment. Always seek the advice of your physician or other qualified healthcare provider with any questions you may 
                                        have regarding a medical condition.</p>
                                    <h6 className='font-bold'>7. Liability</h6>
                                    <p>Serenity Health Center shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with 
                                        the use of this Website or services provided by Serenity Health Center.</p>
                                    <h6 className='font-bold'>8. Governing Law</h6>
                                    <p>These Terms and Conditions are governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law provisions.</p>
                                    <h6 className='font-bold'>9. Changes to Terms and Conditions</h6>
                                    <p>Serenity Health Center reserves the right to modify or replace these Terms and Conditions at any time without prior notice. Your continued use of the Website or services
                                        after any such changes constitutes your acceptance of the new Terms and Conditions.</p>
                                    <h6 className='font-bold'>10. Contact Us</h6>
                                    <p>If you have any questions about these Terms and Conditions, please contact us at <a className='text-[#06A9B2]' href="mailto:info@serenetyheatlhcenter.com">info@serenetyheatlhcenter.com</a></p>
                                    <div className="flex justify-center gap-4 mt-6">
                                        <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold px-4 py-2 rounded-md w-[120px]" onClick={handleTermsAndConditions}>Continue</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <NavLink to={"/login"} className='text-red-600 font-semibold cursor-pointer text-xs underline'>Are you already registered? Sign in</NavLink>
                </form>
            </div>
            
        </main>

        <TermsAndConditions/>

        <GeneralFooter/>

    </div>
    )
}

export default SignUp