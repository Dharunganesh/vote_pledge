import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const CERTIFICATE_API_URL = import.meta.env.VITE_CERTIFICATE_API_URL;

const SuccessScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const userName = location.state?.name || localStorage.getItem("name") || "Citizen";

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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: userName }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate certificate");
      }

      const blob = await response.blob();

      // ✅ FIX: stable blob handling for desktop + mobile
      const blobUrl = window.URL.createObjectURL(
        new Blob([blob], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `certificate-${userName}.pdf`;

      document.body.appendChild(link);
      link.click();

      // ✅ FIX: delay revoke (important for Chrome desktop)
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      }, 200);

    } catch (err) {
      console.error("Certificate download error:", err);
      alert("Download failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 pb-10 bg-orange-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-orange-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
        </div>
        <p className="text-sm font-semibold">Ranipet District</p>
      </header>

      <main className="px-6 py-8 flex flex-col items-center text-center space-y-6">

        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-8 h-8 text-green-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Text */}
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            நன்றி! நீங்கள் நேர்மையான வாக்காளராக உறுதி எடுத்துள்ளீர்கள்!
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Thank you! You have pledged to be an ethical voter!
          </p>
        </div>

        {/* Certificate Preview */}
        <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="h-2 bg-orange-700"></div>

          <div className="p-5 space-y-3 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Certificate of Commitment
            </p>

            <h2 className="text-2xl font-extrabold tracking-wide">
              {userName}
            </h2>

            <p className="text-xs italic text-gray-600">
              "As a citizen of India, I pledge to vote ethically and without being influenced by any inducements."
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-3 pt-2">

          <button
            onClick={downloadCertificate}
            disabled={loading}
            className="w-full bg-orange-700 text-white py-4 rounded-xl font-semibold shadow disabled:opacity-50"
          >
            {loading ? "Downloading..." : "Download Certificate"}
          </button>

          <button className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-medium">
            Share Pledge
          </button>

          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-500 underline pt-2"
          >
            Back to Home
          </button>

        </div>

      </main>
    </div>
  );
};

export default SuccessScreen;
