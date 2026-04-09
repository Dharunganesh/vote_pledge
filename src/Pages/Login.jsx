import React from 'react'
import { BsBank } from "react-icons/bs";
function Login() {
    return (
        <>
            {/* NAVBAR */}
            <div className='flex'>
                <BsBank />
                <h1>இராணிப்பேட்டை மாவட்டம் / Ranipet District</h1>
            </div>

            <div>
                <h1>HOME</h1>
                <h1>PLEDGE</h1>
                <h1>CONTACT</h1>
            </div>
        </>
    )
}

export default Login