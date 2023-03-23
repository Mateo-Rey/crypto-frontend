import "./App.css";
import { ethers } from "ethers";
import { SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";

function App() {
  const theme = {
    primary: "#FFF",
    secondary: "#A9A9A9",
    interactive: "#000",
    container: "#3E517A",
    module: "#b2f3",
    accent: "#71FF98",
    outline: "#42F2F7",
    dialog: "#000",
    fontFamily: "Nunito",
    borderRadius: 1,
  };
  const JSONRPCMAP = {
    1: ["https://mainnet.infura.io/v3/20034e7b0b2d4dbda836cb13cb819bb4"],
  };
  return (
    <>
      <div className="flex">
        <div className="w-[20%] h-full absolute bg-gradient-to-br from-sidebar-secondary to-sidebar-primary shadow-2xl">
          <SwapWidget className="z-10 drop-shadow-2xl" width="20%" brandedFooter={false} jsonRpcUrlMap={JSONRPCMAP} theme={theme} />
        </div>
        <div className="w-[80%] h-full bg-gradient-to-br from-soft-light-blue to-gradient-blue absolute left-[20%] shadow-shadow-blue shadow-lg">
          <div className="absolute h-[10%] brightness-150 shadow-lg drop-shadow-md rounded-full bottom-0 bg-opacity-60 w-full bg-slate-600">
            <input className="outline-none p-6 font-nunito h-[90%] shadow-lg rounded-full drop-shadow-md text-2xl text-white bg-transparent relative top-0.5 left-3 backdrop-blur-lg text-center w-[98%]" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
