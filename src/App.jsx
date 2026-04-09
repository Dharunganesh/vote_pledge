
import React, { useState } from 'react'
import Login from './Pages/Login'
import './App.css'
import OTPVerification from './Pages/OTPVerification'

function App() {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [showOtp, setShowOtp] = useState(false)

    const submitPhoneNumber = () => {
        const regex = /[^0-9]/g
        if (phoneNumber.length < 10 || regex.test(phoneNumber)) alert("தயவுசெய்து சரியான மொபைல் எண்ணை உள்ளிடவும்")
        setShowOtp(true)
    }

    return (
        <div>
            {!showOtp ?
                <Login phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} submitPhoneNumber={submitPhoneNumber} />
                : <OTPVerification phoneNumber={phoneNumber} />
            }
        </div>
    )
}

export default App
