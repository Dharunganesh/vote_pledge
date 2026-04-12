import React from "react";
import Navbar from "../Components/Navbar";

const galleryData = [
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXP_8C8ICdDHbR6oF6XiKbqiwZxMRdyrc5Rw72ge3qTWTxQi_DKnrpmbJSuC-emSJphWQI4r-ic7rXhtC7da-e_ywrlK3U7tJzfgVypa3sWmFsbGokSvSJf_kOJ4hAJqdKb_x0yJM-XjN9Ha-q_5VYnqyiMZxeBsbi6Q1Jo5oumyhy85Q85jBBkWxypi0TlKi0NDfD65UguT7OBYh3SFQO5jZuPAZP0klNwk1xyCaNPIu0-1-x5CgU2AxetbizoXHxX_hHgg7rbrIh",
    titleTa: "தபால் வாக்குகள் பயிற்சி வகுப்பு",
    titleEn: "Postal Voting Training",
    desc: "Training conducted for senior citizens and disabled voters.",
    location: "Collectorate Hall",
    date: "18.03.2026",
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGl3lte3U3VlY-3E-eVx1IG48KQfovRTNAatXoc0aRP4EqtJpLAs15yUs3pvOHfg1p7ZnmZ9grGPtoH4okjm9dHsSZTTohsLGFhDZ_hak2IW7l3fZM6Gez_mdbFKlJBM_sxIPTvGlPL-A-semYEz2iUBuvQtbf186KCCRF8ZF6B8zLRRWKH32FWo_KJLS9urtJvG3H0pjW1asS7fne-JIJDxv7919nEri9REVOOmzk6h-pOltK-pKog_-5QVijm5qF9lBZVQIXD1dk",
    titleTa: "மகளிர் சுய உதவிக் குழுக்கள் விழிப்புணர்வு",
    titleEn: "SHG Awareness",
    desc: "Awareness program for 100% voting participation.",
    location: "Panchayat Union",
    date: "18.03.2026",
  },
];

function Gallery() {
  return (
    <div className="min-h-screen bg-orange-50 pb-24">
      
      <Navbar />

      <div className="pt-24 px-5 max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-orange-600">
            Gallery / கேலரி
          </h1>
          <p className="text-gray-600 mt-2">
            Documenting voter awareness activities across the district.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {galleryData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
            >
              
              {/* Image */}
              <div className="relative">
                <img
                  src={item.img}
                  alt="activity"
                  className="w-full h-52 object-cover"
                />

                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-bold text-orange-600 shadow">
                  {item.date}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-2">

                <h3 className="font-bold text-gray-900 text-lg leading-tight">
                  {item.titleTa}
                </h3>

                <h4 className="text-sm font-semibold text-orange-600">
                  {item.titleEn}
                </h4>

                <p className="text-sm text-gray-600">
                  {item.desc}
                </p>

                {/* Bottom row */}
                <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                  <span>{item.location}</span>
                </div>

              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Gallery;
