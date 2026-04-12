import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";

const CERTIFICATE_API_URL = import.meta.env.VITE_CERTIFICATE_API_URL;

const SuccessScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const userName =
    location.state?.name || localStorage.getItem("name") || "Citizen";

  const downloadCertificate = async () => {
    if (!CERTIFICATE_API_URL) {
      alert("Certificate API URL is not configured");
      return;
    }

    if (!userName.trim()) {
      alert("User name not found");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${CERTIFICATE_API_URL}/generate-certificate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: userName }),
        }
      );

      if (!response.ok) throw new Error("Failed");

      const blob = await response.blob();

      const blobUrl = window.URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `certificate-${userName}.pdf`;

      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      }, 200);
    } catch (err) {
      console.error(err);
      alert("Download failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <Navbar />

      <main
        className="
        flex-1 
        w-full max-w-3xl mx-auto 
        px-4 sm:px-6 md:px-8 
        pt-5 sm:pt-5 md:pt-5
        pb-10
      "
      >
        <div className="mb-3">
          <button
            onClick={() => navigate("/pledge")}
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

        <div className="flex flex-col items-center text-center space-y-5 sm:space-y-6">

          {/* Success Icon */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-7 h-7 sm:w-8 sm:h-8 text-green-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-snug">
              நன்றி! நீங்கள் நேர்மையான வாக்காளராக உறுதி எடுத்துள்ளீர்கள்!
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">
              Thank you! You have pledged to be an ethical voter!
            </p>
          </div>
          <div
            className="
            w-full 
            bg-white 
            rounded-2xl sm:rounded-3xl 
            shadow-lg border border-gray-200 
            overflow-hidden
          "
          >
            <div className="h-2 bg-orange-600"></div>

            <div className="p-4 sm:p-6 md:p-8 space-y-3 text-center">
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-widest">
                Certificate of Commitment
              </p>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide text-gray-900 break-words">
                {userName}
              </h2>

              <p className="text-[11px] sm:text-xs md:text-sm italic text-gray-600 px-2">
                "As a citizen of India, I pledge to vote ethically and without being influenced by any inducements."
              </p>
            </div>
          </div>

          <div className="w-full space-y-3 pt-2">

            <button
              onClick={downloadCertificate}
              disabled={loading}
              className="
                w-full 
                py-3 sm:py-4 
                text-sm sm:text-base md:text-lg 
                bg-orange-600 text-white 
                rounded-xl 
                font-semibold 
                shadow 
                hover:bg-orange-700 
                disabled:opacity-50
              "
            >
              {loading ? "Downloading..." : "Download Certificate"}
            </button>

            <button
              className="
                w-full 
                py-3 sm:py-4 
                text-sm sm:text-base 
                bg-gray-100 text-gray-700 
                rounded-xl 
                font-medium 
                hover:bg-gray-200
              "
            >
              Share Pledge
            </button>

            <button
              onClick={() => navigate("/")}
              className="text-xs sm:text-sm text-gray-500 underline pt-1"
            >
              Back to Home
            </button>

          </div>
        </div>
      </main>
    </div>
  );
};

export default SuccessScreen;