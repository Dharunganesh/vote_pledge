

import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import UserDetails from './Pages/UserDetails'
import PledgeScreen from "./Pages/PledgeScreen";
import SuccessScreen from "./Pages/SuccessScreen";
import './App.css'

function App() {

    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/userDetails' element={<UserDetails />} />
                <Route path="/pledge" element={<PledgeScreen />} />
                <Route path="/success" element={<SuccessScreen /}/>
            </Routes>
        </>
    )
}

export default App
