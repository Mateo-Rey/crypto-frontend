import "./App.css";
import { useState, useEffect } from "react";
import { SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import cryptoavatar from "./assets/cryptoavatar.jpg";
function App() {
  const [models, setModels] = useState([]);
  const [user, setUser] = useState("user");
  const [messageList, setMessageList] = useState([
    { name: "ai", message: "Hello World!" },
  ]);
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
    borderRadius: 1,
  };
  useEffect(() => {
    fetch("http://localhost:3012/models")
      .then((response) => response.json())
      .then((data) => {
        setModels(data.models.filter((model) => model.id == "gpt-3.5-turbo"));
      });
  }, []);
  return (
    <>
      <div className="h-[100%] w-[100%] flex flex-col absolute bg-transparent overflow-hidden">
        <div className="md:w-[20%] h-[40%] md:h-full md:absolute bg-gradient-to-bl from-sidebar-secondary to-sidebar-primary shadow-2xl">
          <button
            onClick={() => {
              setWidgetShow(!widgetShow);
            }}
          >
            Show Swap
          </button>
          <div className="SwapWidget absolute top-0 z-50">
            {widgetShow && (
              <>
                <div className="ease-in-out h-full drop-shadow-2xl">
                  <SwapWidget
                    brandedFooter={false}
                    jsonRpcUrlMap={JSONRPCMAP}
                    theme={theme}
                    convenienceFee={50}
                    convenienceFeeRecipient={{
                      [1]: "0xb8bC25BAAE9785d864E943B47CEa8855b40f911e",
                    }}
                  />
                </div>
                <button
                  onClick={() => {
                    setWidgetShow(!widgetShow);
                  }}
                >
                  Show Swap
                </button>
              </>
            )}
          </div>
        </div>
        <div className="md:w-[80%] h-full overflow-hidden bg-gradient-to-br from-soft-light-blue to-gradient-blue md:absolute left-[20%] shadow-shadow-blue shadow-lg">
          <div className="overflow-scroll h-[90%]">
            {messageList.map((message) => {
              if (message.name === "ai") {
                return (
                  <>
                    <div className="flex flex-col items-center">
                      <div className="flex items-center space-x-3">
                        <img className="rounded-full" src={cryptoavatar} />
                        <div>{message.name}</div>
                      </div>

                      <div className="bg-white bg-opacity-50">{message.message}</div>
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    <div>{message.name}</div>
                    <div>{message.message}</div>
                  </>
                );
              }
            })}
          </div>
          <div className="absolute h-[10%] brightness-150 shadow-lg drop-shadow-md rounded-full bottom-0 bg-opacity-60 w-full bg-slate-600">
            <input className="outline-none tracking-wide p-6 font-nunito h-[85%] md:h-[90%] shadow-lg rounded-full drop-shadow-md text-2xl text-white bg-transparent relative top-1 md:top-0.5 left-1 md:left-3 backdrop-blur-lg text-center w-[98%]" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
