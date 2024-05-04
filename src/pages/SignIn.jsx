import React, {useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authActions from '../redux/actions/auth.actions.js'
import { useNavigate } from 'react-router-dom'
import GeneralFooter from '../components/GeneralFooter.jsx'
import TermsAndConditions from '../components/TermsAndConditions.jsx'
import axios from 'axios'
import GeneralHeader from '../components/GeneralHeader.jsx'
import { getRoleFromJWT } from '../utils/UserRole.js'

function SignIn() {

    const [userData, setUserData] = useState({email: "", password: ""})
    const [invalidEntrance, setinvalidEntrance] = useState("")

    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [showPassword, setShowPassword] = useState(false)

    const {login, current} = authActions

    const dispatch = useDispatch()

    const navigate = useNavigate()


    function handleSignIn(e) {
        e.preventDefault()

        let emailValid = true
        let passwordValid = true

        if(userData.email == "") {
            setEmailError(true)
            emailValid = false
        }

        if(userData.password == "") {
            setPasswordError(true)
            passwordValid = false
        }

        if(emailValid && passwordValid) {
            axios.post("/api/patient/login", userData)
            .then(response => {
                // console.log(response.data)
                const tokenLogin = response.data
                const role = getRoleFromJWT(tokenLogin)
                // console.log(tokenLogin)
    
                const isAdmin = role?.includes("ADMIN")
                const isUser = role?.includes("PATIENT")
    
                // console.log(isAdmin)
                // console.log(isUser)
    
                if (isUser) {
                    axios.get('/api/patient/current', {
                        headers: {
                            Authorization: "Bearer " + tokenLogin
                        }
                    })
                    .then(response => {
                        dispatch(login(tokenLogin))
                        dispatch(current(response.data))
                        navigate("/appointment")
                        // localStorage.setItem("lastLogin", new Date().toISOString())
                    })
                    .catch(error => {
                        // console.log(error.response.data)
                        setinvalidEntrance(error.response.data)
                    })
                } 

                if (isAdmin) {
                    axios.post("/api/admin/login", userData)
                        .then(response => {
                            // console.log(response.data)
                            let token = response.data
                            dispatch(login(token))
                            axios.get('/api/admin/current', {
                                headers: {
                                    Authorization: "Bearer " + token
                                }
                            })
                            .then(response => {
                                dispatch(current(response.data))
                                navigate("/appointmentsAdmin")
                            })
                            .catch(error => {
                                // console.log(error.response.data)
                                setinvalidEntrance(error.response.data)
                            })
                        })
                        .catch(error => {
                            // console.log(error.response.data)
                            setinvalidEntrance(error.response.data)
                        })
                }
            })
            .catch(error => {
                // console.log(error.response.data)
                // console.log(error.response.status)
                setinvalidEntrance(error.response.data)
            })
        }
    }


    // console.log(userData)



    function handleInput(e){
        
        return setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    function handleShowPassword() {
        setShowPassword(!showPassword)
    }

    function handleSelectChange(e) {

        if (e.target.name === "email") {
            setEmailError(false)
            setinvalidEntrance("")
        }

        if(e.target.name === "password") {
            setPasswordError(false)
            setinvalidEntrance("")
        }
    }



    return (
    <>
        <GeneralHeader />

        <main className='w-full flex flex-col flex-1'>
            <div className='flex flex-wrap justify-center items-center'>
                <img className='md:w-1/2' src="/Login.jpg" alt="Image a doctor" />
                <form className='flex flex-col justify-center items-center gap-5 p-8 md:w-1/2' onSubmit={handleSignIn}>
                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/User.png" alt="" />
                            <div className='relative flex'>
                                <input type="email" name="email" className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='Email' autoComplete='username' onInput={handleInput} onFocus={handleSelectChange}/>
                            </div>
                            {emailError && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-[50px]'>Please enter your email</p>}
                        </fieldset>

                        <fieldset className='flex justify-center items-center gap-3 relative'>
                            <img className='w-8' src="/Padlock.png" alt="Icon password" />
                            <div className='relative flex'>
                                <input type={showPassword ? "text" : "password"} name="password" className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='Password' autoComplete="current-password" onInput={handleInput} onFocus={handleSelectChange}/>
                                <img className="w-4 cursor-pointer absolute left-[275px] top-[15px]" src={showPassword ? "/EyeOpen.png" : "/EyeClosed.png"} alt="Toggle password visibility" onClick={handleShowPassword}/>
                            </div>
                            {passwordError && <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-[50px]'>Please enter your password</p>}
                            <p className='text-red-600 font-bold italic text-xs absolute bottom-[-16px] left-[50px]'>{invalidEntrance}</p>
                        </fieldset>

                        <input type="submit" value="Sign in" className='bg-[#F19E22] rounded-xl py-2 px-1 hover:bg-[#dc901e] w-[180px] text-center font-bold text-white cursor-pointer'/>
                        <p className='text-red-600 font-semibold cursor-pointer text-xs underline'>Have you forgotten your password?</p>
                        <NavLink to={"/register"} className='text-red-600 font-semibold cursor-pointer text-xs underline'>Are you not registered yet? SIGN UP</NavLink>
                </form>
            </div>
            
            <TermsAndConditions/>

            
            
        </main>

        <GeneralFooter/>
    
    
    </>    )
}

export default SignIn