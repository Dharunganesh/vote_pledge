import { useRef } from "react";
import { BsBank } from "react-icons/bs";

export default function OTPVerification({ phoneNumber }) {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    inputsRef.current[index].value = value;

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleVerify = async () => {
    let otp = "";
    inputsRef.current.forEach((input) => {
      otp += input.value;
    });

    const phone = `+91${phoneNumber}`;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone, code: otp }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("OTP Verified ✅");
      } else {
        alert("தவறான OTP ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Verification failed ❌");
    }
  };

  const handleResend = async () => {
    const phone = localStorage.getItem("phone");

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      alert("OTP மீண்டும் அனுப்பப்பட்டது ✅");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">

      <div className="flex items-center gap-2 mb-6">
        <BsBank />
        <h1 className="font-bold">Ranipet District</h1>
      </div>

      <h2 className="text-xl font-bold mb-4">
        OTP சரிபார்ப்பு
      </h2>

      <div className="flex gap-2 mb-6">
        {[...Array(6)].map((_, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            maxLength="1"
            onChange={(e) => handleChange(e, i)}
            className="w-10 h-12 text-center border rounded"
          />
        ))}
      </div>

      <button
        onClick={handleVerify}
        className="bg-blue-900 text-white px-6 py-3 rounded mb-4"
      >
        சரிபார்க்கவும்
      </button>

      <button
        onClick={handleResend}
        className="text-blue-700 underline"
      >
        OTP மீண்டும் அனுப்பு
      </button>

    </div>
  );
}