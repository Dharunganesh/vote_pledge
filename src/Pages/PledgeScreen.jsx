import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const PledgeScreen = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const phone = location.state?.phone || localStorage.getItem("phone");
  const name = location.state?.name || localStorage.getItem("name");

  useEffect(() => {
    if (!phone || !name) {
      navigate("/userDetails");
    }
  }, [phone, name, navigate]);

  const handleSubmit = async () => {
    if (!checked1 || !checked2) {
      setError("Please accept both pledge commitments to proceed.");
      return;
    }

    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/update-pledge`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: phone,
          will_vote: checked1,
          wont_accept_bribe: checked2,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Failed");

      localStorage.removeItem("phone");
      localStorage.removeItem("name");

      navigate("/success", { state: { name } });

    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="
        flex-1 
        w-full max-w-3xl mx-auto 
        px-4 sm:px-6 md:px-8 
        pt-5 sm:pt-5 md:pt-5 
        pb-5
      ">

        <div className="mb-4 flex justify-start">
          <button
            onClick={() => navigate("/userDetails")}
            className="
              bg-orange-600 text-white 
              px-4 py-2 sm:px-5 
              text-xs sm:text-sm md:text-base 
              rounded-full 
              hover:bg-orange-700 transition
            "
          >
            Back
          </button>
        </div>

        {/* Title */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600">
            வாக்காளர் உறுதிமொழி
          </h1>

          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-black mt-1">
            Voter Pledge
          </h2>
        </div>

        <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
          Elections are the foundation of democracy. Your vote is your right and responsibility.
        </p>

        {/* Card */}
        <div className="
          bg-gray-100 
          rounded-2xl sm:rounded-3xl 
          p-4 sm:p-6 md:p-8 
          shadow-inner space-y-4 sm:space-y-5
        ">

          <div className="text-center">
            <h3 className="text-base sm:text-lg md:text-xl font-bold">
              Digital Commitment
            </h3>
          </div>

          {[
            {
              state: checked1,
              set: setChecked1,
              ta: "நான் இந்த தேர்தலில் வாக்களிப்பேன்",
              en: "I will vote in this election"
            },
            {
              state: checked2,
              set: setChecked2,
              ta: "வாக்களிப்பதற்காக நான் எந்தப் பணத்தையும் ஏற்றுக்கொள்ள மாட்டேன்.",
              en: "I will not accept any money or incentives"
            }
          ].map((item, i) => (
            <label
              key={i}
              onClick={() => item.set(!item.state)}
              className={`
                flex gap-3 sm:gap-4 
                p-3 sm:p-4 
                rounded-xl border cursor-pointer transition
                ${item.state ? "border-orange-600 shadow-sm" : "border-gray-200"}
              `}
            >
              <div
                className={`
                  w-5 h-5 flex items-center justify-center rounded border
                  ${item.state ? "bg-orange-600 border-orange-600" : "border-gray-300"}
                `}
              >
                {item.state && (
                  <svg viewBox="0 0 12 12" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                )}
              </div>

              <div>
                <p className="font-semibold text-xs sm:text-sm md:text-base">
                  {item.ta}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500">
                  {item.en}
                </p>
              </div>
            </label>
          ))}

          {error && (
            <p className="text-red-500 text-xs sm:text-sm text-center">
              {error}
            </p>
          )}
          <button
            onClick={handleSubmit}
            className="
              w-full 
              py-3 sm:py-4 
              text-sm sm:text-base md:text-lg 
              bg-gradient-to-r from-orange-600 to-orange-500 
              text-white 
              rounded-full 
              font-semibold 
              shadow-lg 
              active:scale-95 
              transition
            "
          >
            உறுதிமொழி சமர்ப்பிக்கவும் / Submit Pledge
          </button>
        </div>

      </main>
    </div>
  );
};

export default PledgeScreen;
