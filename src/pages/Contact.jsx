import React, { useState } from 'react'
import GeneralHeader from '../components/GeneralHeader'
import GeneralFooter from '../components/GeneralFooter'
import axios from 'axios'

function Contact() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        city: '',
        zipCode: '',
        discover: '',
        liveMiami: '',
        message: ''
    })


    const [formSuccess, setFormSuccess] = useState(false)
    const [formError, setFormError] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.values(formData).every(value => value.trim() !== '')) {
            setFormSuccess(true)
            setFormError(false)
            setFormData({
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                city: '',
                zipCode: '',
                discover: '',
                liveMiami: '',
                message: ''
            })
            axios.post('/api/form/send-email', formData)
                .then(response => {
                    // console.log(response.data)
                })
                .catch(error => {
                    // console.log(error)
                })
        } else {
            setFormError(true)
            setFormSuccess(false)
        }
    }

    // console.log(formData)

    return (
    <div className='w-full flex flex-col flex-1'>
        <GeneralHeader />

        <div className='h-[300px] bg-[url("/Bg-Blue.png")] bg-cover bg-center w-full flex justify-center items-center'>
            <h3 className='text-6xl text-white font-bold text-center'>Have questions?</h3>
        </div>
        
        <h1 className='text-center text-5xl font-bold text-[#F19E22]'>Quality care is just a conversation away.</h1>
        <h2 className='text-center text-5xl font-bold text-[#F19E22]'>Let’s have a talk to <span className='text-[#06A9B2]'>get you started.</span></h2>
        
        <div className='flex justify-center mt-14 gap-10 flex-col md:flex-row'>
            <div className='flex flex-col items-center gap-2 md:border-r-2 md:border-r-gray-300 md:pr-6'>
                <img className='w-[100px]' src="/Building.png" alt="Icon building" />
                <div className='flex flex-col items-center'>
                    <h3 className='text-3xl font-bold text-blue-800'>Locations</h3>
                    <h5 className='font-bold text-blue-800 text-xl'>Corporate Offices</h5>
                    <p className='font-bold text-gray-500'>19001 SW 106th Ave Suite C-109</p>
                    <p className='font-bold text-gray-500'>Cutler Bay, FL 33157, U.S.A</p>
                </div>
                <div className='flex flex-col items-center'>
                    <h5 className='font-bold text-blue-800 text-xl'>Mailing Address</h5>
                    <p className='font-bold text-gray-500'>663 E Crescent Ave Suite 100</p>
                    <p className='font-bold text-gray-500'>Beaverton, OR 97005, U.S.A</p>
                </div>
            </div>
            <div className='flex flex-col items-center gap-2 md:border-r-2 md:border-r-gray-300 md:pr-9'>
                <img className='w-[100px]' src="/Smartphone.png" alt="Icon phone" />
                <h3 className='text-3xl font-bold text-blue-800'>Phone</h3>
                <a className='font-bold text-gray-500' href="tel:+18135510112">+18135510112</a>
            </div>
            <div className='flex flex-col items-center gap-2'>
                <img className='w-[100px]' src="/EmailBig.png" alt="Icon email" />
                <h3 className='text-3xl font-bold text-blue-800 '>Email</h3>
                <a className='font-bold text-gray-500' href="mailto:info@serenityhealthcenter.com">admin@serenityhealthcenter.com</a>
            </div>
        </div>

        <div>
            <h2 className='text-center text-5xl font-bold text-[#F19E22] mt-20'>Contact Us</h2>
        </div>
        <form className='flex flex-col justify-center items-center gap-4 lg:gap-6 p-8' onSubmit={handleSubmit}>

                        <fieldset className='flex flex-col justify-center items-center gap-3 relative md:flex-row'>
                            <div className='flex justify-center items-center gap-3'>
                                <img className='w-8' src="/FirstName.png" alt="Icon first name" />
                                <input type="text" name="firstName" value={formData.firstName} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='First Name' autoComplete='username' onChange={handleChange}/>
                            </div>
                            <div className='flex justify-center items-center gap-3'>
                                <img className='w-8' src="/LastName.png" alt="Icon last name" />
                                <input type="text" name="lastName" value={formData.lastName} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='Last Name' autoComplete='username' onChange={handleChange}/>
                            </div>
                        </fieldset>
                        
                        <fieldset className='flex flex-col justify-center items-center gap-3 relative md:flex-row'>
                            <div className='flex justify-center items-center gap-3'>
                                <img className='w-8' src="/PhoneContact.png" alt="icon phone" />
                                <input type="number" name="phone" value={formData.phone} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4 [appearance:textfield] 
                            [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder='Phone Number' autoComplete='username' onChange={handleChange} />
                            </div>
                            <div className='flex justify-center items-center gap-3'>
                                <img className='w-8' src="/UserMail.png" alt="Icon email" />
                                <input type="mail" name="email" value={formData.email} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='Email' autoComplete='username' onChange={handleChange}/>
                            </div>
                        </fieldset>

                        <fieldset className='flex flex-col justify-center items-center gap-3 relative md:flex-row'>
                            <div className='flex justify-center items-center gap-3'>
                                <img className='w-8' src="/City.png" alt="Icon city" />
                                <input type="text" name="city" value={formData.city} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='City' onChange={handleChange}/>
                            </div>
                            <div className='flex justify-center items-center gap-3'>
                                <img className='w-8' src="/ZipCode.png" alt="Icon zip code"/>
                                <input type="text" name="zipCode" value={formData.zipCode} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[300px] rounded-xl h-10 px-4" placeholder='ZIP Code' onChange={handleChange}/>
                            </div>
                        </fieldset>

                        <fieldset className='flex flex-col justify-center items-center gap-3 relative md:flex-row'>
                            <div className='flex justify-center items-center gap-3'>
                                <img className='w-8' src="/Discover.png" alt="Icon discover" />
                                <select name="discover" value={formData.discover} className="font-semibold cursor-pointer border-2 border-[#F19E22] w-[268px] rounded-xl h-10 px-4" onChange={handleChange}>
                                    <option className='text-gray-500 italic' value="">How did you find out about us?</option>
                                    <option value="Social Media">Social Media</option>
                                    <option value="Friend">Friend</option>
                                    <option value="Social Network">Social Network</option>
                                    <option value="Newspaper">Newspaper</option>
                                    <option value="Email">Email</option>
                                    <option value="Website">Website</option>
                                    <option value="Referral">Referral</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className='flex justify-center items-center gap-3 w-[344px]'>
                                <legend className='font-bold text-lg text-[#06A9B2] italic'>Do you live in Miami?</legend>
                                <label className='text-lg flex gap-1 font-semibold'>
                                    <input type="radio" name="liveMiami" value="Yes" onChange={handleChange}/>
                                    <span className='text-[#F19E22]'>Yes</span>
                                </label>
                                <label className='text-lg flex gap-1 font-semibold'>
                                    <input type="radio" name="liveMiami" value="No" onChange={handleChange}/>
                                    <span className='text-[#F19E22]'>No</span>
                                </label>
                            </div>
                        </fieldset>

                        <fieldset>
                            <textarea name="message" value={formData.message} className="font-semibold border-2 border-[#F19E22] w-[344px] md:w-[700px] rounded-xl h-40 px-4 pt-1 resize-none" placeholder='Message' onChange={handleChange}></textarea>
                        </fieldset>

                        {formError && <p className='text-red-500 text-sm font-semibold'>Please fill in all the fields</p>}
                        {formSuccess && <p className='text-green-500 text-sm font-semibold'>Message sent successfully</p>}


                        <div className='relative'>
                            <input type="submit" value="Submit" className='bg-[#F19E22] rounded-xl py-2 px-1 hover:bg-[#dc901e] w-[180px] text-center font-bold text-white cursor-pointer'/>
                        </div>
                </form>

                {/* <div className='flex justify-center'>
                    <div className='bg-blue-500 min-h-[300px] flex justify-center items-center mb-10 w-[344px] md:w-[900px] rounded-full'>
                        <h5 className='text-white font-bold text-6xl text-center'>In your home, <span className='text-[#F19E22] italic'>In your heart.</span></h5>
                    </div>
                </div> */}
                <div className='flex justify-center'>
                    <img className='w-[344px] md:w-[600px] lg:w-[900px] mb-20' src="/InYourHearth.png" alt="Image In your home, in your heart" />
                </div>

        <GeneralFooter/>
    </div>
    )
}

export default Contact