import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const PledgeScreen = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!checked1 || !checked2) {
      setError("Please accept both pledge commitments to proceed.");
      return;
    }

    setError("");

    const location = useLocation();

    const phone = location.state?.phone || localStorage.getItem("phone");
    
    const name = location.state?.name || localStorage.getItem("name");

    if (!phone) {
      setError("User not found. Please login again.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/update-pledge`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: phone,
          will_vote: checked1,
          wont_accept_bribe: checked2,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || "Failed");
      localStorage.removeItem("phone");
      navigate("/success", {state: { name }});

    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col flex-1 pb-24 bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
        </div>
        <div>
          <p className="text-[11px] text-gray-500">இராணிப்பேட்டை மாவட்டம் /</p>
          <p className="text-sm font-semibold">Ranipet District</p>
        </div>
      </header>

      <main className="px-5 py-6 space-y-5">

        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold text-orange-600">
            வாக்காளர் உறுதிமொழி
          </h1>

          <h2 className="text-lg font-semibold text-black mt-1">
            Voter Pledge
          </h2>
        </div>

        <p className="text-gray-600 text-sm"> Elections are the foundation of democracy. Your vote is your right and responsibility. </p>

        {/* Card */}
        <div className="bg-gray-100 rounded-3xl p-5 shadow-inner space-y-4">

          <div className="text-center">
            <h3 className="text-lg font-bold">Digital Commitment</h3>
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
              ta: "நான் எந்த லஞ்சமும் ஏற்கமாட்டேன்",
              en: "I will not accept any bribe or incentives"
            }
          ].map((item, i) => (
            <label
              key={i}
              className={`flex gap-3 p-4 rounded-xl border cursor-pointer transition
              ${item.state ? "border-orange-600 shadow-sm" : "border-gray-200"}`}
            >
              <div
                onClick={() => item.set(!item.state)}
                className={`w-5 h-5 rounded border flex items-center justify-center
                ${item.state ? "bg-orange-600 border-orange-600" : "border-gray-300"}`}
              >
                {item.state && (
                  <svg viewBox="0 0 12 12" className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                )}
              </div>

              <div>
                <p className="font-semibold text-sm">{item.ta}</p>
                <p className="text-xs text-gray-500">{item.en}</p>
              </div>
            </label>
          ))}

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white py-4 rounded-full font-semibold shadow-lg active:scale-95 transition"
          >
            உறுதிமொழி சமர்ப்பிக்கவும் / Submit Pledge
          </button>
        </div>

      </main>
    </div>
  );
};

export default PledgeScreen;
