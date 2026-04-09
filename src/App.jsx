import { useState } from "react";
import PledgeScreen from "./components/PledgeScreen";
import SuccessScreen from "./components/SuccessScreen";

const App = () => {
  const [screen, setScreen] = useState("pledge");
  const userName = "ARUL SELVAN";

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center sm:py-10">
      <div className="w-full max-w-[430px] bg-white min-h-screen sm:min-h-[850px] shadow-2xl flex flex-col overflow-hidden">
        
        {screen === "pledge" && (
          <PledgeScreen onSubmit={() => setScreen("success")} />
        )}

        {screen === "success" && (
          <SuccessScreen
            userName={userName}
            onHome={() => setScreen("pledge")}
          />
        )}

      </div>
    </div>
  );
};

export default App;