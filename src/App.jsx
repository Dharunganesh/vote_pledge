<<<<<<< Updated upstream

import React, { useState } from 'react'
import Login from './Pages/Login'
=======
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import UserDetails from './Pages/UserDetails'
>>>>>>> Stashed changes
import './App.css'
import OTPVerification from './Pages/OTPVerification'

function App() {
<<<<<<< Updated upstream
    const [phoneNumber, setPhoneNumber] = useState('')
    const [showOtp, setShowOtp] = useState(false)

    const submitPhoneNumber = async () => {
        const regex = /[^0-9]/g
        if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
            alert("தயவுசெய்து சரியான மொபைல் எண்ணை உள்ளிடவும்")
            return
        }
        const phone = `+91${phoneNumber}`
        try {

            await fetch(`${import.meta.env.VITE_API_URL}/send-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ phone })
            })

            localStorage.setItem("phone", phone)
        } catch (err) {
            alert("OTP அனுப்புவதில் பிழை ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.")
            console.error(err)
        }


        setShowOtp(true)
    }

    return (
        <div>
            {!showOtp ?
                <Login phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} submitPhoneNumber={submitPhoneNumber} />
                : <OTPVerification phoneNumber={phoneNumber} />
            }
        </div>
=======
    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/userDetails' element={<UserDetails />} />
            </Routes>
        </>
>>>>>>> Stashed changes
    )
}

export default App
