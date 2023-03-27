import "./App.css";
import { useState, useEffect } from "react";
import { SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import { ChatMessage } from "./components/ChatMessage";
function App() {
  const [models, setModels] = useState([]);
  const [keyPress, setKeyPress] = useState();
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
    let chatListNew = [
      ...messageList,
      { role: "user", content: `${question}` },
    ];
    if (chatListNew[0].role !== "system") {
      chatListNew.unshift({
        role: "system",
        content:
          "You are a helpful crypto assistant. You can only answer questions regarding crypto related",
      });
    }
    setQuestion("");
    setLoading(true);
    setMessageList(chatListNew);
    const response = await fetch("http://localhost:3012/cryptochat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "true",
      },
      body: JSON.stringify({
        messages: chatListNew,
        model: activeModel,
        max_tokens: tokens,
        temperature: temperature,
      }),
    })
      .then((response) => response.json())
      .then((data) =>
        setMessageList([
          ...chatListNew,
          { role: "assistant", content: data.message },
        ])
      );
    setLoading(false);
  };
  console.log(messageList);
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
      <div className="h-[100%] w-[100%] overflow-hidden z-10 flex flex-col absolute bg-gradient-to-br from-chat-primary to-chat-secondary">
        {!widgetShow ? (
          <>
            <button
              className="effect text-center text-white effect-inner active:effect-smaller-inner active:border-2 py-2 rounded-3xl bg-chat-primary w-36 h-10"
              onClick={() => {
                setWidgetShow(!widgetShow);
              }}
            >
              Show Chat
            </button>

            <div className="transition place-self-center ease-in-out h-full drop-shadow-2xl">
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
          </>
        ) : (
          <>
            <div className="flex h-[100%] flex-col">
              <div className="md:w-[25%] h-[50%] grid-flow-col grid-cols-2 brightness-125 grid-rows-2 md:h-full md:absolute bg-gradient-to-bl from-sidebar-secondary to-sidebar-primary shadow-2xl">
                <div className="flex place-content-evenly my-2">
                  <button
                    className="effect text-center text-white effect-inner active:effect-smaller-inner active:border-2 py-2 rounded-3xl bg-chat-primary w-36 h-10"
                    onClick={() => {
                      setWidgetShow(!widgetShow);
                      console.log(widgetShow);
                    }}
                  >
                    Show Widget
                  </button>

                  <button
                    className=" effect text-center text-white effect-inner active:effect-smaller-inner active:border-2 py-2 rounded-3xl bg-chat-primary w-36 h-10"
                    onClick={() => {
                      setMessageList([]);
                      setQuestion("");
                    }}
                  >
                    Clear Chat
                  </button>
                </div>
                <div className="grid grid-cols-2 text-white place-content-evenly m-2">
                  <div className="flex flex-col items-center">
                    <label>Tokens</label>
                    <input
                      className="outline-none effect-inner hover:border-2 relative w-32 h-10 text-center tracking-wide p-6 font-nunito shadow-lg rounded-full drop-shadow-md text-2xl text-white bg-transparent backdrop-blur-lg"
                      onChange={(e) => setTokens(e.target.value)}
                      type={Number}
                      value={tokens}
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <label>Temperature</label>
                    <div className="effect effect-inner rounded-full p-2 hover:border-2 w-full h-12 bg-chat-primary flex items-center place-content-center">
                    <input
                      className="w-full cursor-pointer"
                      type="range"
                      min="0"
                      max="20"
                      onChange={(e) => setTemperature(e.target.value)}
                      value={temperature}
                    />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:h-[90%] absolute left-[25%] w-[75%] flex flex-col p-5 overflow-scroll">
                {messageList.map((message, i) => (
                  <ChatMessage message={message} key={i} />
                ))}
              </div>
              <div className="absolute h-[10%] md:left-[25%] bottom-0 w-full md:w-[75%]">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <input
                    name="input"
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => setKeyPress(e.key)}
                    value={question}
                    autoComplete="off"
                    className="outline-none effect-lighter-inner text-white/70 absolute tracking-wide bottom-2 left-2 p-6 font-nunito h-[85%] md:h-[90%] shadow-lg rounded-full drop-shadow-md text-2xl bg-transparent backdrop-blur-lg text-center w-[98%]"
                  />
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
