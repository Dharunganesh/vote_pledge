import React from 'react'
import Navbar from '../Components/Navbar';

function Login({ setPhoneNumber, phoneNumber, submitPhoneNumber }) {
    return (
        <div className='min-h-screen bg-neutral-200'>
            <Navbar />

            <div className='flex flex-col items-center px-5 py-6'>


                <div className='mt-15 bg-green-300 text-green-900 px-6 py-2 rounded-full text-sm font-semibold md:px-8 md:mb-10 md:mt-10'>
                    மாவட்ட தேர்தல் பிரிவு • ராணிப்பேட்டை
                </div>

                <h1 className='text-2xl font-bold text-center mt-6 text-blue-900 md:text-4xl'>
                    உங்கள் வாக்கு நாட்டின் வலிமை
                </h1>

                <p className='text-center text-gray-700 mt-2 md:text-2xl'>
                    உங்கள் வாக்கு நாட்டின் பலம்
                </p>

                <p className='text-center text-gray-600 mt-4 text-sm md:text-2xl'>
                    வாக்களிப்பு உறுதிமொழி எடுக்க உங்கள் மொபைல் எண்ணை உள்ளிடவும்
                </p>

                <div className='bg-white w-full max-w-md mt-10 p-4 rounded-2xl shadow md:max-w-150 md:max-h-150 md:mt-20'>

                    <label className='text-xs font-semibold text-gray-700'>
                        மொபைல் எண்
                    </label>

                    <input
                        type="text"
                        placeholder="+91 98765 43210"
                        className='w-full mt-2 mb-2 p-3 rounded-lg bg-gray-100 outline-none md:mb-5'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}

                    />

                    <button className='w-full mt-4 bg-blue-900 text-white py-4 rounded-xl font-semibold md:mb-5' onClick={() => submitPhoneNumber()}>
                        OTP அனுப்பு →
                    </button>

                </div>

            </div>
        </div>
    )
}

export default Login