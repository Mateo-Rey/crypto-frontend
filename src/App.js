import "./App.css";
import { useState, useEffect } from "react";
import { SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import cryptoavatar from "./assets/cryptoavatar.jpg";
function App() {
  const [models, setModels] = useState([]);
  const [activeModel, setActiveModel] = useState("gpt-3.5-turbo");
  const [user, setUser] = useState("user");
  const [question, setQuestion] = useState("");
  const [tokens, setTokens] = useState(100);
  const [temperature, setTemperature] = useState(1);
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [widgetShow, setWidgetShow] = useState(false);
  const JSONRPCMAP = {
    1: ["https://mainnet.infura.io/v3/20034e7b0b2d4dbda836cb13cb819bb4"],
  };
  const theme = {
    primary: "#fff",
    secondary: "#EDF7F6",
    interactive: "#3066BE",
    container: "#45489B",
    module: "#313D5A",
    accent: "#4C9B75",
    outline: "#fff",
    dialog: "#000",
    fontFamily: "Nunito",
    borderRadius: 0,
  };
  console.log(question);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessageList([...messageList, { role: user, content: question }]);
    setQuestion("");
    setLoading(true);
    const messages = messageList;
    const response = await fetch("http://localhost:3012/cryptochat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "true",
      },
      body: JSON.stringify({
        messages: messages,
        model: activeModel,
        max_tokens: tokens,
        temperature: temperature,
      }),
    });
    console.log(response.json());
    setMessageList([...messageList, { name: "ai", message: response.message }]);
  };
  useEffect(() => {
    fetch("http://localhost:3012/models")
      .then((response) => response.json())
      .then((data) => {
        setModels(
          data.models.filter((model) => model.id == "text-davinci-003")
        );
      });
  }, []);
  return (
    <>
      <div className="h-[100%] w-[100%] flex flex-col absolute bg-transparent overflow-hidden">
        <div className="md:w-[25%] h-[40%] md:h-full md:absolute bg-gradient-to-bl from-sidebar-secondary to-sidebar-primary shadow-2xl">
          <button
            className="effect effect-inner drop border-2 active:border-4 active:effect-smaller-inner active:ring-slate-400 py-2 rounded-3xl bg-slate-400 w-36 h-10"
            onClick={() => {
              setWidgetShow(!widgetShow);
            }}
          >
            Show Swap
          </button>
          <div className="SwapWidget absolute top-0 z-50">
            {widgetShow && (
              <>
                <div className="transition ease-in-out h-full drop-shadow-2xl">
                  <SwapWidget
                    brandedFooter={false}
                    jsonRpcUrlMap={JSONRPCMAP}
                    theme={theme}
                    convenienceFee={50}
                    width={360}
                    convenienceFeeRecipient={{
                      [1]: "0xb8bC25BAAE9785d864E943B47CEa8855b40f911e",
                    }}
                  />
                </div>
                <button
                  className="effect effect-inner drop border-2 active:border-4 active:effect-smaller-inner active:ring-slate-400 py-2 rounded-3xl bg-slate-400 w-36 h-10"
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
        <div className="md:w-[75%] h-full overflow-hidden bg-gradient-to-br from-soft-light-blue to-gradient-blue md:absolute left-[25%] shadow-shadow-blue shadow-lg">
          <div className="overflow-scroll flex flex-col place-items-center h-[90%]">
            {messageList.map((message) => {
              if (message.name === "ai") {
                return (
                  <>
                    <div className="outline p-2 my-2 text-white outline-4 outline-input-outline bg-input-primary bg-opacity-80 ease-in-out shadow-lg rounded-lg">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center space-x-3">
                          <img className="rounded-full" src={cryptoavatar} />
                          <div className="font-nunito">{message.name}</div>
                        </div>
                        <div className="font-nunito">{message.message}</div>
                      </div>
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    <div className="outline text-white p-2 my-2 outline-4 outline-input-outline bg-input-primary bg-opacity-80 ease-in-out shadow-lg rounded-lg">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center space-x-3">
                          <div className="font-nunito">{message.name}</div>
                        </div>
                        <div className="font-nunito">{message.message}</div>
                      </div>
                    </div>
                  </>
                );
              }
            })}
          </div>
          <div className="absolute h-[10%] shadow-lg drop-shadow-md rounded-full bottom-0 bg-opacity-60 w-full bg-slate-600">
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                name="input"
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
                className="outline-none tracking-wide p-6 font-nunito h-[85%] md:h-[90%] shadow-lg rounded-full drop-shadow-md text-2xl text-white bg-transparent relative top-1 md:top-0.5 left-1 md:left-3 backdrop-blur-lg text-center w-[98%]"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
