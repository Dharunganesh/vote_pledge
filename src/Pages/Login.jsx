import React from 'react'
import Navbar from '../Components/Navbar'
import mascot from '../assets/mascot.png'
import roundLogo from '../assets/round-logo.png'
import ecilogo from '../assets/eci-logo.png'
<<<<<<< Updated upstream
=======
import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate()

    const handleEnter = () => {
        navigate("/userDetails")
    }
>>>>>>> Stashed changes

function Login({ setPhoneNumber, phoneNumber, submitPhoneNumber }) {
    return (
        <div className='min-h-screen bg-neutral-200 relative'>
            <Navbar />
            <div className='flex justify-between'>
                <img
                    src={ecilogo}
                    alt="mascot"
                    className='absolute left-4 top-27 w-30 md:w-40 md:right-10 md:top-28 drop-shadow-lg z-1'
                />
                <img
                    src={roundLogo}
                    alt="mascot"
                    className='absolute right-3 top-24 w-34 md:w-40 md:right-10 md:top-28 drop-shadow-lg z-1'
                />

            </div>

            <div className='flex flex-col items-center px-5 py-6 z-10 relative'>

                <h1 className='text-2xl font-bold text-center px-5 py-5 rounded-2xl mt-30 text-orange-600 md:text-4xl'>
                    உங்கள் வாக்கு நாட்டின் வலிமை
                </h1>

                <p className='text-center text-gray-900 mt-5 text-xl md:text-2xl'>
                    வாக்களிப்பு உறுதிமொழி எடுக்க உங்கள் மொபைல் எண்ணை உள்ளிடவும்
                </p>

                <div className='bg-white w-full max-w-md mt-5 p-4 rounded-2xl shadow md:max-w-xl md:mt-20'>

                    <label className='text-xs font-semibold text-gray-700'>
                        மொபைல் எண் / Mobile Number
                    </label>

                    <input
                        type="text"
                        placeholder="+91 98765 43210"
                        className='w-full mt-2 mb-2 p-3 rounded-lg bg-gray-100 outline-none md:mb-5'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />

                    <button
                        className='w-full mt-4 bg-orange-600 text-white py-4 rounded-xl font-semibold md:mb-5'
                        onClick={() => submitPhoneNumber()}
                    >
                        OTP அனுப்பு / Send OTP
                    </button>

                    <div className='flex items-center justify-between'>
                        <p className='mt-5 text-center'>
                            VOTER HELPLINE <br />
                            <span className='text-red-500 font-extrabold'>1950</span>
                        </p>

                        <p className='mt-5 text-center'>
                            OFFICIAL PORTAL<br />
                            <span className='text-black font-bold'>Govt of Tamil Nadu</span>
                        </p>

                    </div>


                </div>

            </div>
        </div>
    )
}

export default Login
