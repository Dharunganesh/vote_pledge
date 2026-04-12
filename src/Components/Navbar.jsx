import React from 'react'
import { BsBank } from "react-icons/bs";
import { MdHowToVote } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { MdPhotoLibrary } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* DESKTOP NAVBAR */}
            <div className='hidden md:flex justify-between items-center px-6 py-6 shadow bg-white'>
                <div className='flex items-center gap-2 text-xl'>
                    <BsBank size={28} />
                    <h1>இராணிப்பேட்டை மாவட்டம் / Ranipet District</h1>
                </div>

                <div className='flex gap-8 text-lg font-semibold'>
                    
                    <h1
                        onClick={() => navigate("/pledge")}
                        className={`cursor-pointer ${isActive("/pledge") ? "text-orange-600" : ""}`}
                    >
                        PLEDGE
                    </h1>

                    <h1
                        onClick={() => navigate("/info")}
                        className={`cursor-pointer ${isActive("/info") ? "text-orange-600" : ""}`}
                    >
                        INFO
                    </h1>

                    <h1
                        onClick={() => navigate("/gallery")}
                        className={`cursor-pointer ${isActive("/gallery") ? "text-orange-600" : ""}`}
                    >
                        GALLERY
                    </h1>

                </div>
            </div>

            {/* MOBILE NAVBAR (TOP) */}
            <div className='md:hidden flex items-center gap-3 text-xl px-4 py-4 bg-white shadow'>
                <BsBank size={28} />
                <h1 className='text-sm'>இராணிப்பேட்டை மாவட்டம் / Ranipet District</h1>
            </div>

            {/* MOBILE BOTTOM NAVBAR */}
            <div className='md:hidden fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-around py-4 rounded-t-2xl'>

                <div
                    onClick={() => navigate("/pledge")}
                    className={`flex flex-col gap-1 items-center cursor-pointer ${isActive("/pledge") ? "text-orange-600" : "text-gray-700"}`}
                >
                    <MdHowToVote size={25} />
                    <span className='text-sm'>உறுதிமொழி</span>
                </div>

                <div
                    onClick={() => navigate("/info")}
                    className={`flex flex-col gap-1 items-center cursor-pointer ${isActive("/info") ? "text-orange-600" : "text-gray-700"}`}
                >
                    <FaInfoCircle size={25} />
                    <span className='text-sm'>தகவல்</span>
                </div>

                <div
                    onClick={() => navigate("/gallery")}
                    className={`flex flex-col gap-1 items-center cursor-pointer ${isActive("/gallery") ? "text-orange-600" : "text-gray-700"}`}
                >
                    <MdPhotoLibrary size={25} />
                    <span className='text-sm'>கேலரி</span>
                </div>

            </div>
        </>
    )
}

export default Navbar
