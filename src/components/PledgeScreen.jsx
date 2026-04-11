import { useState } from "react";
import deerImg from "../assets/deer.jpeg";

const PledgeScreen = ({ onSubmit }) => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!checked1 || !checked2) {
      setError("Please accept both pledge commitments to proceed.");
      return;
    }

    setError("");

    try {
      setLoading(true);

      // ✅ Get phone from localStorage
      const phone = localStorage.getItem("phone");

      if (!phone) {
        setError("User not found. Please fill details again.");
        setLoading(false);
        return;
      }

      // ✅ API CALL
      const response = await fetch(
        "https://otp-verification-gpty.onrender.com/update-pledge",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone_number: phone,
            will_vote: true,
            wont_accept_bribe: true,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update pledge");

      // ✅ Go to success screen
      onSubmit && onSubmit();

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Header */}
      <header className="bg-white border-b px-4 py-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
          <div className="w-5 h-5 bg-orange-700 rounded-sm"></div>
        </div>
        <div>
          <p className="text-sm text-gray-500">இராணிப்பேட்டை மாவட்டம்</p>
          <p className="text-lg font-semibold">Ranipet District</p>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 max-w-5xl mx-auto w-full space-y-8">

        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold">
            வாக்காளர் உறுதிமொழி
          </h1>
          <h2 className="text-orange-600 text-xl font-semibold">
            Voter Pledge
          </h2>
        </div>

        {/* Description */}
        <div className="text-center">
          <p className="text-lg font-medium text-gray-800">
            தேர்தல் ஜனநாயகத்தின் அடிக்கல்.
          </p>
          <p className="text-base text-gray-600">
            Elections are the foundation of democracy.
          </p>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <img
            src={deerImg}
            alt="Awareness"
            className="w-full max-w-lg h-[230px] object-contain rounded-xl shadow"
          />
        </div>

        {/* Commitment */}
        <div className="bg-white rounded-2xl p-6 shadow space-y-5">

          <h3 className="text-center text-xl font-bold">
            Digital Commitment
          </h3>

          {/* Checkbox 1 */}
          <label className="flex gap-4 p-4 border rounded-xl cursor-pointer">
            <input
              type="checkbox"
              checked={checked1}
              onChange={() => setChecked1(!checked1)}
              className="scale-125 mt-1"
            />
            <div>
              <p className="text-lg font-semibold">
                நான் இந்த தேர்தலில் வாக்களிப்பேன்
              </p>
              <p className="text-sm text-gray-500">
                I will vote in this election
              </p>
            </div>
          </label>

          {/* Checkbox 2 */}
          <label className="flex gap-4 p-4 border rounded-xl cursor-pointer">
            <input
              type="checkbox"
              checked={checked2}
              onChange={() => setChecked2(!checked2)}
              className="scale-125 mt-1"
            />
            <div>
              <p className="text-lg font-semibold">
                நான் எந்த லஞ்சமும் ஏற்கமாட்டேன்
              </p>
              <p className="text-sm text-gray-500">
                I will not accept any bribe
              </p>
            </div>
          </label>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-center font-medium">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-orange-700 text-white py-4 rounded-xl text-lg font-semibold shadow"
          >
            {loading ? "Submitting..." : "Submit Pledge"}
          </button>

        </div>

      </main>
    </div>
  );
};

export default PledgeScreen;