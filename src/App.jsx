
import React, { useState } from 'react'
import Login from './Pages/Login'
import './App.css'

function App() {
    const [phoneNumber, setPhoneNumber] = useState('')

    const submitPhoneNumber = () => {
        console.log(phoneNumber)
    }

    return (
        <div>
            <Login phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} submitPhoneNumber={submitPhoneNumber} />
        </div>
    )
}

export default App