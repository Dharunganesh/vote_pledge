
import React, { useState } from 'react'
import Login from './Pages/Login'
import './App.css'

function App() {
    const [phoneNumber, setPhoneNumber] = useState('')

    const submitPhoneNumber = (e) => {
        e.preventDefault()
        const regex = /[^0-9]/g
        if (phoneNumber.length < 10 || regex.test(phoneNumber)) alert("தயவுசெய்து சரியான மொபைல் எண்ணை உள்ளிடவும்")
        console.log(phoneNumber)
    }

    return (
        <div>
            <Login phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} submitPhoneNumber={submitPhoneNumber} />
        </div>
    )
}

export default App