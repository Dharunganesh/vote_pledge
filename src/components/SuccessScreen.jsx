import { useLocation } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const SuccessScreen = ({ onHome }) => {
  const location = useLocation();

  // ✅ Safe name extraction
  const userName =
    location.state?.userName || localStorage.getItem("name") || "User";

  const downloadCertificate = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/generate-certificate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: userName }),
        }
      );

      if (!response.ok) throw new Error("Failed");

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "certificate.pdf";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Download failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <header className="bg-white border-b px-4 py-4 flex items-center gap-3">
        <p className="text-lg font-semibold">Ranipet District</p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center space-y-6">

        <h1 className="text-2xl font-bold">
          Thank you for your pledge!
        </h1>

        <h2 className="text-xl font-semibold">{userName}</h2>

        <button
          onClick={downloadCertificate}
          className="bg-orange-700 text-white px-6 py-3 rounded-lg"
        >
          Download Certificate
        </button>

      </main>
    </div>
  );
};

export default SuccessScreen;