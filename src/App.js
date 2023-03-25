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
    let chatListNew = [...messageList, {role: "user", content: `${question}`}]
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
      <div className="h-[100%] w-[100%] flex flex-col absolute bg-transparent overflow-hidden">
        <div className="md:w-[25%] h-[40%] md:h-full md:absolute bg-gradient-to-bl from-sidebar-secondary to-sidebar-primary shadow-2xl">
          <button
            className="effect text-center text-white effect-inner active:effect-smaller-inner active:border-2 py-2 rounded-3xl bg-chat-primary w-36 h-10"
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
                  className="effect text-center text-white effect-inner active:effect-smaller-inner active:border-2 py-2 rounded-3xl bg-chat-primary w-36 h-10"
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
        <div className="md:w-[75%] h-full overflow-scroll bg-gradient-to-br from-chat-primary to-chat-secondary md:absolute left-[25%] shadow-light-chat-shadow shadow-lg">
          <div className="overflow-scroll flex flex-col place-items-center h-[90%]">
            {messageList.map((message, i) => (
                <ChatMessage message={message} key={i} />
              ))};
          
          </div>
          <div className="absolute h-[10%] shadow-lg drop-shadow-md rounded-full bottom-0 bg-opacity-60 w-full bg-slate-600">
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                name="input"
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => setKeyPress(e.key)}
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
