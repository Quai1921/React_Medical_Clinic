import React, { useState } from 'react'
import axios from 'axios'

function GeneralFooter() {


    const [formData, setFormData] = useState({
        name: '',
        identification: '',
        phone: '',
        email: '',
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
                name: '',
                identification: '',
                phone: '',
                email: '',
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



    return (
        <footer className='w-full'>
            <div className='flex flex-col items-center justify-center bg-blue-800 w-full min-h-[600px] gap-2 py-6'>
                <img className='w-60 pt-4' src="/LogoSerenetyH.png" alt="Image logo Serenety Health Center" />
                <div className='flex flex-col justify-center gap-14 mt-4 lg:flex-row'>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-2 bg-white rounded-xl px-3 py-2'>
                        <p className='font-bold text-xl text-blue-800'>Need help?</p>
                        <input className='w-72 h-10 rounded-md border-2 border-blue-300 px-3' type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Name and surname' />
                        <input className='w-72 h-10 rounded-md border-2 border-blue-300 px-3' type="text" name="identification" value={formData.identification} onChange={handleChange} placeholder='Identification' />
                        <input className='w-72 h-10 rounded-md border-2 border-blue-300 px-3' type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder='Phone' />
                        <input className='w-72 h-10 rounded-md border-2 border-blue-300 px-3' type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email' />
                        <textarea className='w-72 h-20 rounded-md resize-none border-2 border-blue-300 px-3' name="message" value={formData.message} onChange={handleChange} placeholder='Message'></textarea>
                        <div className='self-end'>
                            <input className='w-20 h-10 rounded-md bg-green-500 text-white font-bold' type="submit" value="Submit" />
                        </div>
                        {formError && <p className='text-red-500 text-sm font-semibold'>Please fill in all the fields</p>}
                        {formSuccess && <p className='text-green-500 text-sm font-semibold'>Message sent successfully</p>}
                    </form>

                    <div className='flex flex-col gap-4 w-[300px]'>
                        <h3 className="font-extrabold text-[#F19E22] text-xl">Telephone numbers of interest</h3>
                        <div className='flex flex-col gap-1'>
                            <div className='flex gap-2'>
                                <img className='w-6' src="/Phone.png" alt="" />
                                <p className='text-[#06A9B2] font-bold'>Medical guard</p>
                            </div>
                            <a className='text-white' href="tel:+6306908132">(630) 690-8132</a>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className='flex gap-2'>
                                <img className='w-6' src="/CallCenter.png" alt="" />
                                <p className='text-[#06A9B2] font-bold'>Call center</p>
                            </div>
                            <a className='text-white' href="tel:+6306908132">(0610) 4333-02812</a>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4 w-[300px]'>
                        <h3 className='font-extrabold text-[#F19E22] text-xl'>General information</h3>
                        <div className='flex flex-col gap-1'>
                            <div className='flex gap-2'>
                                <img className='w-6' src="/Email.png" alt="" />
                                <p className='text-[#06A9B2] font-bold'>Information</p>
                            </div>
                            <a className='text-white' href="mailto:mdhl@chihockey.org">info@serenetyheatlhcenter.com</a>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className='flex gap-2'>
                                <img className='w-6' src="/Email.png" alt="" />
                                <p className='text-[#06A9B2] font-bold'>Internment - Authorizations</p>
                            </div>
                            <a className='text-white' href="mailto:mdhl@chihockey.org">admission@serenetyheatlhcenter.com</a>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <div className='flex gap-2'>
                                <img className='w-6' src="/Email.png" alt="" />
                                <p className='text-[#06A9B2] font-bold'>Surgery budgets - Studies</p>
                            </div>
                            <a className='text-white' href="mailto:mdhl@chihockey.org">budgets@serenetyheatlhcenter.com</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default GeneralFooter