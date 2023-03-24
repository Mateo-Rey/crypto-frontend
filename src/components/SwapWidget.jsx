import { useState } from "react";
import { SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
export const CryptoSwap = () => {
  const [widgetShow, setWidgetShow] = useState(false);
  const JSONRPCMAP = {
    1: ["https://mainnet.infura.io/v3/20034e7b0b2d4dbda836cb13cb819bb4"],
  };
  const theme = {
    primary: "#fff",
    secondary: "#EDF7F6",
    interactive: "#3066BE",
    container: "#1D2D44",
    module: "#313D5A",
    accent: "#4C9B75",
    outline: "#fff",
    dialog: "#000",
    fontFamily: "Nunito",
    borderRadius: 0.8,
  };
  return (
    <div className="SwapWidget">
      <button
        onClick={() => {
          setWidgetShow(!widgetShow);
        }}
      >
        Show Swap
      </button>
      {widgetShow && (
        <SwapWidget
          className="z-10 rounded-none drop-shadow-2xl"
          width="20%"
          brandedFooter={false}
          jsonRpcUrlMap={JSONRPCMAP}
          theme={theme}
        />
      )}
    </div>
  );
};
