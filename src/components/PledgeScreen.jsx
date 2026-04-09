import { useState } from "react";
import mascotImg from "../assets/deer.jpeg";

const PledgeScreen = ({ onSubmit }) => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!checked1 || !checked2) {
      setError("Please accept both pledge commitments to proceed.");
      return;
    }
    setError("");
    onSubmit && onSubmit();
  };

  return (
    <div className="flex flex-col flex-1 pb-24 bg-orange-50">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-orange-700" fill="none" stroke="currentColor" strokeWidth="2">
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

      <main className="px-5 py-6 space-y-6">

        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">வாக்காளர் உறுதிமொழி</h1>
          <h2 className="text-lg font-semibold text-orange-600">Voter Pledge</h2>
        </div>

        {/* Description */}
        <div className="border-l-2 border-orange-300 pl-3">
          <p className="text-gray-600 text-sm">
            Elections are the foundation of democracy. Your vote is your right and responsibility.
          </p>
        </div>

        {/* ✅ Mascot (Top Half Only, No Text) */}
        <div className="flex justify-center">
          <div className="w-[260px] h-[230px] rounded-2xl overflow-hidden shadow-md border border-orange-200">
            <img
              src={mascotImg}
              alt="Mascot"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Commitment Card */}
        <div className="bg-white rounded-3xl p-5 shadow-md space-y-4">

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
              ${item.state ? "border-green-600 shadow-sm" : "border-gray-200"}`}
            >
              <div
                onClick={() => item.set(!item.state)}
                className={`w-5 h-5 rounded border flex items-center justify-center
                ${item.state ? "bg-green-600 border-green-600" : "border-gray-300"}`}
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

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-orange-600 to-orange-800 text-white py-4 rounded-full font-semibold shadow-lg active:scale-95 transition"
          >
            உறுதிமொழி சமர்ப்பிக்கவும் / Submit Pledge
          </button>
        </div>

        {/* Progress */}
        <div className="flex flex-col items-center pt-4">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="6" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#ea580c"
                strokeWidth="6"
                fill="none"
                strokeDasharray="251"
                strokeDashoffset="62"
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold">75%</span>
              <span className="text-[10px] text-gray-500">District Progress</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-3">
            Join 125,000+ residents who already pledged
          </p>
        </div>
      </main>
    </div>
  );
};

export default PledgeScreen;