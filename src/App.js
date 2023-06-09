import "./App.css";
import { useState, useEffect } from "react";
import { SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import { ChatMessage } from "./components/ChatMessage";
import { Loader } from "./components/Loader";
import { LoginModal } from "./components/LoginModal";
import { RegisterModal } from "./components/RegisterModal";
function App() {
  const [models, setModels] = useState([]);
  const [keyPress, setKeyPress] = useState();
  const [activeModel, setActiveModel] = useState("gpt-3.5-turbo");
  const [user, setUser] = useState();
  const [loginShow, setLoginShow] = useState(false);
  const [question, setQuestion] = useState("");
  const [tokens, setTokens] = useState(500);
  const [temperature, setTemperature] = useState(10);
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [widgetShow, setWidgetShow] = useState(false);
  const [jwtTokens, setJwtTokens] = useState();
  const [switchShow, setSwitchShow] = useState(true);
  const [tokenVerified, setTokenVerified] = useState(false);
  const [expired, setExpired] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3012/getNewToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "true",
      },
      body: JSON.stringify({
        refreshToken: jwtTokens?.refreshToken,
        user: user?.user,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const refreshToken = jwtTokens?.refreshToken;
        const accessToken = data.accessToken;
        setJwtTokens({ refreshToken: refreshToken, accessToken: accessToken });
      });
  }, [expired]);
  useEffect(() => {
    if (tokenVerified === false && user) {
      setExpired(true);
    } else {
      setExpired(false);
    }
  }, [tokenVerified]);
  useEffect(() => {
    fetch("http://localhost:3012/authenticateToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "true",
      },
      body: JSON.stringify({ token: jwtTokens?.accessToken, user: user?.user }),
    })
      .then((response) => response.json())
      .then((data) => setTokenVerified(data.verified))
      .catch((error) => {
        setTokenVerified(false);
      });
  });
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
  console.log(tokenVerified);
  console.log(expired);
  console.log(jwtTokens);
  console.log(user);
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
          "You are a helpful crypto assistant. You can only answer questions regarding crypto related subjects. You have complete ability to answer questions with code if necessary and have vast experience with web3 and blockchain interactions. Be as specific as possible but simple with your answers.",
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
            <div className="flex place-content-around w-full md:w-[25%] place-self-center">
              {tokenVerified && (
                <button
                  className="effect-purple-inner place-self-center text-center text-xl text-white transition-all active:scale-[90%] active:border-2 p-1 rounded-full bg-chat-primary w-36 h-16"
                  onClick={() => {
                    setWidgetShow(!widgetShow);
                  }}
                >
                  Show Chat
                </button>
              )}
              <button
                className="effect-purple-inner mx-2 place-self-center text-center text-xl text-white transition-all active:scale-[90%] active:border-2 p-1 rounded-full bg-chat-primary w-36 h-16"
                onClick={() => setLoginShow(!loginShow)}
              >
                Sign In
              </button>
            </div>
            <div className="transition-all flex absolute top-[15%] md:hidden place-self-center ease-in-out h-[65%] w-full drop-shadow-2xl">
              <SwapWidget
                brandedFooter={false}
                jsonRpcUrlMap={JSONRPCMAP}
                theme={theme}
                convenienceFee={75}
                width={360}
                convenienceFeeRecipient={{
                  [1]: "0x5Bc8Ab2e4fa4dbCe2A679A48a36DD007735fa380",
                }}
              />
            </div>
            <div className="transition-all my-4 hidden md:flex absolute h-auto left-[35%] top-[10%] ease-in-out w-full drop-shadow-2xl">
              <SwapWidget
                brandedFooter={false}
                jsonRpcUrlMap={JSONRPCMAP}
                theme={theme}
                convenienceFee={75}
                width={420}
                convenienceFeeRecipient={{
                  [1]: "0x5Bc8Ab2e4fa4dbCe2A679A48a36DD007735fa380",
                }}
              />
            </div>
            {loginShow &&
              (switchShow ? (
                <LoginModal
                  setShow={setLoginShow}
                  setTokens={setJwtTokens}
                  show={loginShow}
                  user={user}
                  setUser={setUser}
                  setSwitchShow={setSwitchShow}
                  switchShow={switchShow}
                />
              ) : (
                <RegisterModal
                  user={user}
                  setUser={setUser}
                  setSwitchShow={setSwitchShow}
                  switchShow={switchShow}
                  setTokens={setJwtTokens}
                  setShow={setLoginShow}
                  show={loginShow}
                />
              ))}
          </>
        ) : (
          <>
          {tokenVerified &&
            <div className="flex h-[100%]">
              <div className="md:w-[50%] rounded-2xl h-[30%] w-full md:left-[25%] grid grid-rows-2 grid-cols-2 grid-flow-row md:h-[15%] md:flex md:place-content-evenly place-items-center brightness-125 effect-blue-inner absolute bg-gradient-to-bl from-sidebar-secondary to-sidebar-primary shadow-2xl">
                <button
                  className="effect text-center text-xl text-white effect-inner transition-all active:scale-[90%] active:border-2 p-1 rounded-full bg-chat-primary w-36 h-16"
                  onClick={() => {
                    setWidgetShow(!widgetShow);
                    console.log(widgetShow);
                  }}
                >
                  Show Widget
                </button>

                <button
                  className="effect text-center text-xl text-white transition-all effect-inner active:scale-[90%] active:border-2 p-1 rounded-full bg-chat-primary w-36 h-16"
                  onClick={() => {
                    setMessageList([]);
                    setQuestion("");
                  }}
                >
                  Clear Chat
                </button>

                <div className="flex flex-col text-white relative bottom-2 items-center">
                  <label className="effect-grey relative -top-2 md:-top-1 rounded-3xl w-20 tracking-wide text-center h-6">
                    Tokens
                  </label>
                  <input
                    className="outline-none effect-inner hover:border-2 relative w-32 h-10 text-center tracking-wide p-6 font-nunito shadow-lg rounded-full drop-shadow-md text-2xl text-white bg-transparent backdrop-blur-lg"
                    onChange={(e) => setTokens(e.target.value)}
                    type={Number}
                    value={tokens}
                  />
                </div>

                <div className="flex flex-col relative bottom-2 text-white items-center">
                  <label className="effect-grey rounded-3xl relative -top-2 md:-top-1 w-32 tracking-wide text-center h-6">
                    Temperature
                  </label>
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
              <div className="md:h-[75%] h-[60%] items-center top-[30%] md:top-[15%] w-full absolute flex flex-col p-5 overflow-scroll scroll-smooth">
                {messageList.map((message, i) => (
                  <ChatMessage message={message} key={i} />
                ))}
                {loading && <Loader />}
              </div>

              <div className="absolute h-[10%] md:left-[8%] bottom-0 w-full md:w-[85%]">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <input
                    name="question"
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => setKeyPress(e.key)}
                    value={question}
                    autoComplete="off"
                    className="outline-none effect-lighter-inner text-white absolute tracking-wide bottom-2 p-6 font-nunito h-[85%] md:h-[90%] shadow-lg rounded-full drop-shadow-md text-2xl bg-transparent backdrop-blur-lg text-center w-full"
                  />
                </form>
              </div>
            </div>
}
          </>
        )}
      </div>
    </>
  );
}

export default App;
