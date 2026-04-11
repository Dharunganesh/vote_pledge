

import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import UserDetails from './Pages/UserDetails'
import './App.css'

function App() {

    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/userDetails' element={<UserDetails />} />
            </Routes>
        </>
    )
}

export default App
