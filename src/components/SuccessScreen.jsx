import { useState } from "react";
import { useLocation } from "react-router-dom";

const CERTIFICATE_API_URL = import.meta.env.VITE_CERTIFICATE_API_URL;

const SuccessScreen = ({ onHome }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const userName =
    location.state?.userName || localStorage.getItem("name") || "";

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

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "certificate.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Certificate download error:", err);
      alert("Download failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white border-b px-4 py-4 flex items-center gap-3">
        <p className="text-lg font-semibold">Ranipet District</p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center space-y-6 px-4">
        <h1 className="text-2xl font-bold">Thank you for your pledge!</h1>

        <h2 className="text-xl font-semibold">{userName || "Guest"}</h2>

        <button
          onClick={downloadCertificate}
          disabled={loading}
          className="bg-orange-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
        >
          {loading ? "Downloading..." : "Download Certificate"}
        </button>
      </main>
    </div>
  );
};

export default SuccessScreen;