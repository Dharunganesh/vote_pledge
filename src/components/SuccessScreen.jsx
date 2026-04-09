const SuccessScreen = ({ userName, onHome }) => {
  return (
    <div className="flex flex-col flex-1 pb-10 bg-gray-50">

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
        <p className="text-sm font-semibold">Ranipet District</p>
      </header>

      <main className="px-6 py-8 flex flex-col items-center text-center space-y-6">

        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" strokeWidth="3">
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

        {/* Certificate */}
        <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="h-2 bg-blue-900"></div>

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

            <div className="flex justify-center pt-3">
              <div className="w-14 h-14 bg-gray-100 rounded-md"></div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-3 pt-2">
          <button className="w-full bg-blue-900 text-white py-4 rounded-xl font-semibold shadow">
            Download Certificate
          </button>

          <button className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-medium">
            Share Pledge
          </button>

          <button
            onClick={onHome}
            className="text-sm text-gray-500 underline pt-2"
          >
            Back to Home
          </button>
        </div>

        {/* Stats */}
        <div className="w-full pt-6 space-y-3">
          <div className="bg-white rounded-xl p-4 shadow text-center">
            <p className="text-xl font-bold">12,840+</p>
            <p className="text-xs text-gray-500">Total pledges today</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow text-center">
            <p className="text-xl font-bold">45%</p>
            <p className="text-xs text-gray-500">Goal Progress</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow text-center">
            <p className="text-blue-600 font-semibold">Top 3</p>
            <p className="text-xs text-gray-500">Ranipet rank in TN</p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default SuccessScreen;