import React from "react";
import Navbar from "../Components/Navbar";

function InfoPage() {
  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] min-h-screen">

      <Navbar />

      <main className="pt-20 pb-24">

        {/* HERO */}
        <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-16">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                உங்கள் ஓட்டு நாட்டின் வலிமை
              </h2>

              <p className="mt-4 text-lg">
                Your Vote is the Strength of the Nation
              </p>

              <p className="mt-3 text-sm opacity-90">
                Voting is every citizen’s responsibility
              </p>
            </div>

            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoXRE99eo1yX1N8dHnE72NE_MWRHeOwaEwt_vSK6RIiaIk6LuijOD6_Yl373V3okopy7ihcikZ8UpZTTY_cvpq4lfSu2-SEfbMH48clgF8QBInavLKkP_isYUuQkERcdDFYtjUcVFbf1ppaENoLQB1q77Tx76xN7BKPTKmbS08MzVVcO1PIdpoPDKGLbZ5aTLYa7z_-DHMUEXGLslGEsiBilylwDPPpc2KizU60YOTzBPsgAuVcOxWzpQuMnvLAeMY0do-SUC60InH"
              alt="Voting"
              className="rounded-xl shadow-lg"
            />
          </div>
        </section>

        {/* INFO CARDS */}
        <section className="max-w-6xl mx-auto px-6 mt-10 grid md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              வாக்களிப்பின் முக்கியத்துவம்
            </h3>
            <p className="text-gray-600">
              Elections are the foundation of democracy. Your vote is your right.
            </p>
          </div>

          <div className="bg-blue-900 text-white p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">
              Ethical Voting
            </h3>
            <p className="opacity-80">
              Voting without accepting bribes is your responsibility.
            </p>
          </div>

        </section>

        {/* HOW TO VOTE */}
        <section className="max-w-6xl mx-auto px-6 mt-10 bg-gray-100 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">
            எப்படி வாக்களிப்பது / How to Vote
          </h3>

          <ol className="space-y-3 list-decimal pl-5">
            <li>Visit your polling booth</li>
            <li>Carry valid ID</li>
            <li>Cast your vote</li>
          </ol>
        </section>

        {/* NOTICE */}
        <section className="max-w-6xl mx-auto px-6 mt-10 bg-red-100 p-6 rounded-xl">
          <h3 className="text-lg font-bold text-red-700">
            முக்கிய அறிவிப்பு / Important Notice
          </h3>
          <p className="mt-2">
            Election Day — April 23, 2026
          </p>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-blue-900 text-white p-6 text-center">
        <p>© 2026 Election Commission of India</p>
      </footer>

    </div>
  );
}

export default InfoPage;
