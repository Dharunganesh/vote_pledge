import React from 'react'
import Navbar from '../Components/Navbar'
import roundLogo from '../assets/round-logo.png'
import ecilogo from '../assets/eci-logo.png'
import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate()

    const handleEnter = () => {
        navigate("/userDetails")
    }

    return (
        <div className='min-h-screen bg-neutral-200 flex flex-col relative pb-48'>

            <Navbar />

            <div className='flex justify-between'>
                <img
                    src={ecilogo}
                    alt="logo"
                    className='absolute left-4 top-27 w-30 md:w-40 md:right-10 md:top-28 drop-shadow-lg z-1 lg:left-20 lg:w-50'
                />
                <img
                    src={roundLogo}
                    alt="logo"
                    className='absolute right-3 top-24 w-34 md:w-40 md:right-10 md:top-28 drop-shadow-lg z-1 lg: lg:w-50'
                />
            </div>

            <div className='grow flex flex-col items-center px-5 py-6 z-10 mt-10'>

                <h1 className='text-2xl font-bold text-center px-5 py-5 rounded-2xl mt-30 text-orange-600 md:text-4xl'>
                    உங்கள் வாக்கு நாட்டின் வலிமை
                </h1>

                <p className='text-center text-gray-900 mt-5 text-xl md:text-2xl'>
                    வாக்களிப்பு உறுதிமொழி எடுக்க கீழே உள்ள பொத்தானை அழுத்தவும்
                </p>

                {/* Card */}
                <div className='bg-white w-full max-w-md mt-5 p-4 rounded-2xl shadow md:max-w-xl md:mt-20'>

                    <button
                        className='w-full mt-4 bg-orange-600 text-white py-4 rounded-xl font-semibold md:mb-5'
                        onClick={handleEnter}
                    >
                        உள்ள்நுழைக / Enter
                    </button>

                    <div className='w-full px-5 mt-10 mb-4 sm:mt-15 md:mt-1 lg:mt-0'>
                        <div className='flex items-center justify-between'>

                            <p className='text-center text-sm'>
                                VOTER HELPLINE <br />
                                <span className='text-red-500 font-extrabold'>1950</span>
                            </p>

                            <p className='text-center text-sm'>
                                OFFICIAL PORTAL<br />
                                <span className='text-black font-bold'>Govt of Tamil Nadu</span>
                            </p>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login
