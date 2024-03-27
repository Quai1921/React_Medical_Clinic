import React from 'react'

const Specialties = () => {
    return (
        <main className='flex flex-col py-6 min-h-[100vh]'>
            <section className='flex flex-col items-center gap-8'>
                <h1 className='text-3xl text-[#06A9B2] font-semibold'>Specialties</h1>
                <p className='text-center px-2'>Click on the specialty you are looking for to view the medical history.</p>
                <article className='flex flex-wrap gap-8 justify-center'>
                <div className='flex flex-col items-center'>
                        <div className='rounded-full border-2 border-[#F19E22] w-[70px] h-[70px] flex justify-center items-center hover:bg-[#F19E22] '>
                            <div className='bg-[url("/public/corazon.png")] bg-cover bg-center w-[60px] h-[60px] p-2 rounded-full hover:bg-[url("/public/corazonOrange.png")]'></div>
                        </div>
                        <p className='font-semibold'>CARDIOLOGIST</p>
                    </div>

                    <div className='flex flex-col items-center'>
                        <div className='rounded-full border-2 border-[#F19E22] w-[70px] h-[70px] flex justify-center items-center hover:bg-[#F19E22] '>
                            <div className='bg-[url("/public/nino.png")] bg-cover bg-center w-[60px] h-[60px] p-2 rounded-full hover:bg-[url("/public/ninoOrange.png")]'></div>
                        </div>
                        <p className='font-semibold'>PEDIATRICIAN</p>
                    </div>

                    <div className='flex flex-col items-center'>
                        <div className='rounded-full border-2 border-[#F19E22] w-[70px] h-[70px] flex justify-center items-center hover:bg-[#F19E22] '>
                            <div className='bg-[url("/public/cerebro.png")] bg-cover bg-center w-[55px] h-[55px] p-2 rounded-full hover:bg-[url("/public/cerebroOrange.png")]'></div>
                        </div>
                        <p className='font-semibold'>NEUROLOGIST</p>
                    </div>

                    <div className='flex flex-col items-center'>
                        <div className='rounded-full border-2 border-[#F19E22] w-[70px] h-[70px] flex justify-center items-center hover:bg-[#F19E22] '>
                            <div className='bg-[url("/public/utero.png")] bg-cover bg-center w-[55px] h-[55px] p-2 rounded-full hover:bg-[url("/public/uteroOrange.png")]'></div>
                        </div>
                        <p className='font-semibold'>GYNECOLOGIST</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <div className='rounded-full border-2 border-[#F19E22] w-[70px] h-[70px] flex justify-center items-center hover:bg-[#F19E22] '>
                            <div className='bg-[url("/public/neumologia.png")] bg-cover w-[55px] h-[55px] rounded-full hover:bg-[url("/public/neumologiaOrange.png")]'></div>
                        </div>
                        <p className='font-semibold'>PULMONOLOGIST</p>
                    </div>

                    <div className='flex flex-col items-center'>
                        <div className='rounded-full border-2 border-[#F19E22] w-[70px] h-[70px] flex justify-center items-center hover:bg-[#F19E22] '>
                            <div className='bg-[url("/public/hueso.png")] bg-cover bg-center w-[55px] h-[55px] p-2 rounded-full hover:bg-[url("/public/huesoOrange.png")]'></div>
                        </div>
                        <p className='font-semibold'>TRAUMATOLOGIST</p>
                    </div>

                    <div className='flex flex-col items-center'>
                        <div className='rounded-full border-2 border-[#F19E22] w-[70px] h-[70px] flex justify-center items-center hover:bg-[#F19E22] '>
                            <div className='bg-[url("/public/estomago.png")] bg-cover bg-center w-[55px] h-[55px] p-2 rounded-full hover:bg-[url("/public/estomagoOrange.png")]'></div>
                        </div>
                        <p className='font-semibold'>GASTROENTEROLOGIST</p>
                    </div>
                </article>


                
            </section>
        </main>
    )
}

export default Specialties