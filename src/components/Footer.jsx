import React from 'react'


function Footer() {
    return (
        <footer className='w-full bg-[#F19E22] py-6 flex flex-col items-center px-2 text-white'>
            <img src="/public/Logo.png" alt="" className='bg-white rounded-full p-0.5 w-[60px] h-[60px]' />

            <article className='flex flex-col items-center w-full md:flex-row'>
                <div className=' flex flex-col gap-2 border-b-2 border-white py-6 px-2 text-center w-[75%] md:border-0 md:w-[33%]'>
                    <div className='flex flex-col text-center gap-4'>
                        <p>Serenity Health Center "Your Partner in Comprehensive Care"</p>
                        <p className='font-semibold'>123 Wellness Way, Springfield, IL 62704</p>
                    </div>
                    <p className='font-semibold'>Phone: <span className='font-normal'> (555) 123-4567 | Fax: (555) 765-4321</span></p>
                    <p className='font-semibold'>Email: <span className='font-normal'> info@serenityhealthcenter.com</span></p>
                    <p className='font-semibold'>Visit Us Online: <span className='font-normal'> www.serenityhealthcenter.com</span></p>
                </div>

                <div className='flex flex-col gap-2 items-center border-white border-b-2 py-4 px-2 text-center w-[75%] md:border-0 md:w-[33%]'>
                    <h2 className='text-xl font-semibold text-center w-[100%]'>Follow us</h2>
                    <div className='flex gap-4'>
                        <img src="/public/WhatsAppOrange.png" alt="" className='w-[50px] h-[50px]' />
                        <img src="/public/InstagramOrange.png" alt="" className='w-[50px] h-[50px]' />
                        <img src="/public/FacebookOrange.png" alt="" className='w-[50px] h-[50px]' />
                    </div>
                </div>

                <div className='flex flex-col items-center text-center py-4 px-2 gap-4 md:w-[33%]'>
                    <p>Privacy Policy | Terms of Use | HIPAA Compliance</p>
                    <p>© 2024 Serenity Health Center. All rights reserved.</p>
                </div>
            </article>
        </footer>

    )
}

export default Footer