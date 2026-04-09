import { useEffect, useRef } from "react";
import { BsBank } from "react-icons/bs";
export default function OTPVerification({ phoneNumber }) {
  const inputsRef = useRef([]);

  useEffect(() => {
    const inputs = inputsRef.current;

    inputs.forEach((input, index) => {
      input.addEventListener("input", (e) => {
        if (e.target.value && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });
    });
  }, []);

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
        alert("Invalid OTP ❌");
      }
    } catch (err) {
      console.error(err);
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

      alert("OTP Resent ✅");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-xl shadow-sm flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-3">
          <BsBank size={30} />
          <h1 className="text-lg font-bold text-[#001d44] font-headline tracking-tight">
            இராணிப்பேட்டை மாவட்டம் / Ranipet District
          </h1>
        </div>
      </header>

      {/* Main */}
      <main className="grow flex items-center justify-center px-4 pt-24 pb-12">
        <div className="max-w-md w-full">

          {/* Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-primary font-headline mb-4 tracking-tight">
              OTP சரிபார்ப்பு / OTP Verification
            </h2>
            <p className="text-on-surface-variant font-body leading-relaxed max-w-[320px] mx-auto text-sm md:text-base">
              உங்கள் எண்ணிற்கு அனுப்பப்பட்ட 6-இலக்க குறியீட்டை உள்ளிடவும் / Enter
              the 6-digit code sent to your number.
            </p>
          </div>

          {/* OTP Inputs */}
          <div className="space-y-8">
            <div className="flex justify-between gap-2 md:gap-3">
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  maxLength="1"
                  type="text"
                  placeholder="•"
                  className="w-full h-14 md:h-16 text-center text-2xl font-bold bg-surface-container-highest border-none rounded-xl focus:ring-0 focus:bg-surface-container-lowest transition-all duration-200 border-b-2 border-transparent focus:border-surface-tint"
                />
              ))}
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              className="w-full py-4 rounded-xl bg-orange-600 text-white font-semibold text-lg shadow-[0px_12px_32px_rgba(25,28,29,0.1)] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
            >
              <span>சரிபார்க்கவும் / Verify OTP</span>
            </button>

            {/* Resend */}
            <div className="text-center">
              <button
                onClick={handleResend}
                className="text-primary font-bold hover:underline decoration-primary decoration-2 underline-offset-4 transition-all"
              >
                மீண்டும் அனுப்பவும் / Resend OTP
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="mt-12 p-6 bg-surface-container-low rounded-xl flex items-start gap-4">
            <div>
              <h4 className="font-bold text-primary text-sm">
                பாதுகாப்பான சரிபார்ப்பு / Secure Verification
              </h4>
              <p className="text-sm text-on-secondary-container mt-1 tamil-text">
                உங்கள் வாக்காளர் உறுதிமொழியை உறுதிப்படுத்த இந்த 6-இலக்க குறியீடு
                அவசியமானது. <br /> This code is required to finalize your digital voter
                pledge.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 mt-auto bg-[#f3f4f5] flex flex-col items-center justify-center gap-4 text-center px-4">
        <div className="flex items-center gap-4 text-slate-600">
          <span className="material-symbols-outlined text-sm">
            phone_in_talk
          </span>
          <span className="font-public-sans text-xs uppercase tracking-widest">
            Voter Helpline: 1950
          </span>
        </div>
        <p className="font-public-sans text-xs uppercase tracking-widest text-[#001d44] tamil-text">
          தமிழ்நாடு சட்டமன்ற தேர்தல் 2026 / Tamil Nadu Election 2026
        </p>
      </footer>
    </div>
  );
}
