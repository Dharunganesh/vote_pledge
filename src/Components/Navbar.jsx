import React from 'react'
import { BsBank } from "react-icons/bs";
import { MdHowToVote } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
function Navbar() {
    return (
        <>
            {/* DESKTOP NAVBAR */}
            <div className='hidden md:flex justify-between items-center px-6 py-6 shadow'>
                <div className='flex items-center gap-2 text-2xl'>
                    <BsBank size={25} />
                    <h1>Ranipet District</h1>
                </div>

                <div className='flex gap-8 text-lg'>
                    <h1>PLEDGE</h1>
                    <h1>INFO</h1>
                    <h1>ACTIVITIES</h1>
                </div>
            </div>

            {/* MOBILE NAVBAR */}
            <div className='md:hidden flex items-center gap-3 text-2xl px-4 py-4 bg-white'>
                <BsBank size={28} />
                <h1>Ranipet District</h1>
            </div>

            {/* BOTTOM NAVBAR */}
            <div className='md:hidden fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-around py-6 rounded-t-2xl'>

                <div className='flex flex-col gap-2 items-center text-gray-700'>
                    <MdHowToVote size={25} />
                    <span className='text-md'>உறுதிமொழி</span>
                </div>

                <div className='flex flex-col gap-2 items-center text-gray-700'>
                    <FaInfoCircle size={25} />
                    <span className='text-md'>தகவல்</span>
                </div>

                <div className='flex flex-col gap-2 items-center text-gray-700'>
                    <MdEmojiEvents size={25} />
                    <span className='text-md'>செயல்பாடுகள்</span>
                </div>

            </div>
        </>
    )
}

export default Navbar