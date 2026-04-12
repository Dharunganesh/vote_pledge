import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import UserDetails from './Pages/UserDetails'
import PledgeScreen from "./Pages/PledgeScreen";
import SuccessScreen from "./Pages/SuccessScreen";
import Gallery from "./Pages/Gallery";
import './App.css'

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/userDetails' element={<UserDetails />} />
                <Route path='/pledge' element={<PledgeScreen />} />
                <Route path='/success' element={<SuccessScreen />} />
                <Route path="/gallery" element={<Gallery />} />
            </Routes>
        </>
    )
}

export default App
