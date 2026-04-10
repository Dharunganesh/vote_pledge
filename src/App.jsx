import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import OTPVerification from './Pages/OTPVerification'
import LoginWrapper from './Components/LoginWrapper'
import UserDetails from './Pages/userDetails'
import './App.css'

function App() {
    const [phoneNumber, setPhoneNumber] = useState('')

    return (
        <>
            <Routes>
                <Route path='/' element={<LoginWrapper phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />} />
                <Route path='/otp' element={<OTPVerification phoneNumber={phoneNumber} />} />
                <Route path='/userDetails' element={<UserDetails />} />
            </Routes>
        </>
    )
}

export default App
