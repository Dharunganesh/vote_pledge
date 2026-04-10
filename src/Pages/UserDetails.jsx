import { useState } from "react";

export default function UserDetails() {
  const [gender, setGender] = useState("");
  const [block, setBlock] = useState("");
  const [name, setName] = useState("")

  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-xl shadow-sm h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#001d44] text-2xl">account_balance</span>
          <span className="text-lg font-bold text-[#001d44] tracking-tight" style={{ fontFamily: "'Public Sans', sans-serif" }}>
            இராணிப்பேட்டை மாவட்டம் / Ranipet District
          </span>
        </div>
        <div className="hidden md:flex gap-8">
          <a className="text-slate-500 hover:bg-slate-200/50 transition-colors px-3 py-1 rounded-lg" href="#">முகப்பு / Home</a>
          <a className="text-[#001d44] font-bold border-b-2 border-[#001d44] px-3 py-1" href="#">உறுதிமொழி / Pledge</a>
          <a className="text-slate-500 hover:bg-slate-200/50 transition-colors px-3 py-1 rounded-lg" href="#">தகவல் / Info</a>
        </div>
      </header>

      {/* Main Content */}
      <main className="grow pt-24 pb-12 px-4 md:px-8 max-w-4xl mx-auto w-full">
        {/* Editorial Header */}
        <div className="mb-12">
          <h1
            className="text-4xl md:text-5xl font-extrabold text-[#001d44] leading-tight tracking-tight mb-4"
            style={{ fontFamily: "'Public Sans', sans-serif" }}
          >
            உங்கள் விவரங்களை{" "}
            <span className="text-[#6b9bef]">உறுதிப்படுத்தவும்</span>
            <br />
            <span className="text-2xl md:text-3xl font-bold opacity-80">Confirm Your Details</span>
          </h1>
          <p className="text-[#43474f] max-w-2xl text-lg leading-relaxed">
            வாக்காளர் உறுதிமொழி ஏற்பதற்கு முன் உங்கள் விவரங்கள் சரியாக இருப்பதை உறுதி செய்யவும். / Please verify
            that your details are correct before taking the voter pledge.
          </p>
        </div>

        {/* Details Confirmation Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0px_12px_32px_rgba(25,28,29,0.06)]">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#001d44] uppercase tracking-wider">
                  பெயர் / Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#f3f4f5] rounded-xl px-4 py-4 text-[#191c1d] font-medium focus:ring-2 focus:ring-[#255dad]"
                />
              </div>

              {/* Age */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#001d44] uppercase tracking-wider">
                  வயது / Age
                </label>
                <div className="bg-[#f3f4f5] rounded-xl px-4 py-4 text-[#191c1d] font-medium">24</div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#001d44] uppercase tracking-wider">
                  பிறந்த தேதி / Date of Birth
                </label>
                <div className="bg-[#f3f4f5] rounded-xl px-4 py-4 text-[#191c1d] font-medium">15/05/2000</div>
              </div>

              {/* District */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#001d44] uppercase tracking-wider">
                  மாவட்டம் / District
                </label>
                <div className="bg-[#e1e3e4]/50 rounded-xl px-4 py-4 text-[#001d44] font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">location_on</span>
                  இராணிப்பேட்டை / Ranipet
                </div>
              </div>

              {/* Block */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#001d44] uppercase tracking-wider">
                  வட்டம் / Block
                </label>
                <select
                  className="w-full bg-[#f3f4f5] border-none rounded-xl px-4 py-4 text-[#191c1d] focus:ring-2 focus:ring-[#255dad] font-medium appearance-none"
                  value={block}
                  onChange={(e) => setBlock(e.target.value)}
                >
                  <option value="Arcot">ஆற்காடு / Arcot</option>
                  <option value="Walaja">வாலாஜா / Walaja</option>
                  <option value="Arakkonam">அரக்கோணம் / Arakkonam</option>
                  <option value="Nemili">நெமிலி / Nemili</option>
                </select>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#001d44] uppercase tracking-wider">
                  பாலினம் / Gender
                </label>
                <div className="flex gap-4">
                  <label
                    className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl cursor-pointer transition-colors ${gender === "male" ? "bg-[#d5e4f7]" : "bg-[#f3f4f5] hover:bg-[#d5e4f7]"
                      }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === "male"}
                      onChange={() => setGender("male")}
                      className="text-[#001d44] focus:ring-[#001d44]"
                    />
                    <span className="font-medium">ஆண் / Male</span>
                  </label>
                  <label
                    className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl cursor-pointer transition-colors ${gender === "female" ? "bg-[#d5e4f7]" : "bg-[#f3f4f5] hover:bg-[#d5e4f7]"
                      }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === "female"}
                      onChange={() => setGender("female")}
                      className="text-[#001d44] focus:ring-[#001d44]"
                    />
                    <span className="font-medium">பெண் / Female</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Info Banner */}
            <div className="mt-12 p-6 bg-[#a3f69c]/20 rounded-xl flex gap-4 items-start border-l-4 border-[#002504]">
              <span className="material-symbols-outlined text-[#002504]" style={{ fontVariationSettings: "'FILL' 1" }}>
                info
              </span>
              <div>
                <p className="text-sm text-[#002504] font-semibold leading-relaxed">
                  உங்கள் விவரங்கள் வாக்காளர் பட்டியலில் உள்ளபடி இருப்பதை உறுதி செய்யவும். தவறான விவரங்கள் உறுதிமொழியை
                  செல்லாததாக்கலாம்.
                </p>
                <p className="text-xs text-[#002504]/80 mt-1 uppercase tracking-tight">
                  Ensure details match your voter ID to keep the pledge valid.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <button
                type="button"
                className="text-slate-500 font-semibold hover:text-[#001d44] transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                திருத்தவும் / Edit
              </button>
              <button
                type="submit"
                className="w-full md:w-auto px-12 py-4 bg-gradient-to-br from-[#001d44] to-[#00326b] text-white rounded-3xl font-bold text-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                தொடரவும் / Continue
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </form>
        </div>

        {/* Decorative Images */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCIvoLqCEBp3cUMZ4APcVVfPpPEEMEUBwVbBiKpiUHaDmhUASEox6PmZYgkKlfcT_w8Trrag2oOLGipCn0HBuFWcPcMygBOhxq8vtWAJaQAw9Z1wFBy-NWQs6nINWuvsvWMgiyH7LVAMggYeuoeFzppBnNtUSIOa5YIEnwkBtEUkOD3WdVnhxnOOnZsyAgSOJz383BA4Yk59yOa6_C2gTxhq554F3haFkovdsLUQvHCqCLc_rEEJYwVkoA9ZMBm3UpojBqHTSxEk1He",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA955jERtAtAA4KGGxOLcWwNGg8GtjovI_BUqdX9P87uL0ow97EJDCrOqouPyUGczi4sVoDuWof3-iKtK74DNCywbJrmw3-IdNip_zTxO9rGtEPui_PUzakQN5D-WO4NHegAsxLtFWKpYpobJCf3jes7D8KBfVAPA-Og2g-E04J232GgXNHlZ6MIJQruErD6uI2YYLjlRcldyZ4WoQjPm45fwgMoZ4mq3fnIbtgXqVZmvIRlBsYE6dIPyoEzLwTKI-QyqL-h3M7Pk5d",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDnM5ed-UsKhFYKnmYrSOjf4AzLjQFOWOR6GMie_loOGKGIODMHp0kzbPkhq4uHAoFM7NbgsQuRDNxbNL7aLFzu5SIbrbY7b5YW89fOb9NaU6asV9uXlyJm7S99fX10RwuK71pDBsfcZ6vzd3ayFqwMrqD9EtH2wq8rvNmqrVL1GypIRfK-9c3VWexc-VvTWW1YcIlteqMdOcVWBS83avOTaxQ39oviUMfalsPetZB1W8rtCW-tTWHbvNOUGEJSgYOGFgvFRYnFA1H6",
          ].map((src, i) => (
            <div key={i} className="h-32 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img className="w-full h-full object-cover" src={src} alt="" />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 mt-auto bg-[#f3f4f5] flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-xs uppercase tracking-widest text-[#001d44] leading-relaxed">
          தமிழ்நாடு சட்டமன்ற தேர்தல் 2026 / Tamil Nadu Election 2026
        </p>
        <div className="flex gap-6">
          <a className="text-slate-600 text-xs font-bold uppercase hover:underline decoration-[#001d44]" href="#">
            Voter Helpline: 1950
          </a>
        </div>
      </footer>

      {/* Bottom Nav (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-white/80 backdrop-blur-2xl border-t border-slate-200/20 shadow-[0px_-12px_32px_rgba(25,28,29,0.06)] z-50 rounded-t-3xl">
        <a className="flex flex-col items-center justify-center text-slate-500 px-4 py-2 active:scale-90 transition-transform" href="#">
          <span className="material-symbols-outlined text-2xl">home</span>
          <span className="text-[10px] font-semibold mt-1">முகப்பு / Home</span>
        </a>
        <a className="flex flex-col items-center justify-center bg-gradient-to-br from-[#001d44] to-[#00326b] text-white rounded-2xl px-6 py-2 active:scale-90 transition-transform" href="#">
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>how_to_vote</span>
          <span className="text-[11px] font-semibold mt-1">உறுதிமொழி / Pledge</span>
        </a>
        <a className="flex flex-col items-center justify-center text-slate-500 px-4 py-2 active:scale-90 transition-transform" href="#">
          <span className="material-symbols-outlined text-2xl">info</span>
          <span className="text-[10px] font-semibold mt-1">தகவல் / Info</span>
        </a>
      </nav>
    </div>
  );
}
