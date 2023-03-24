import "./App.css";
import { useState, useEffect } from "react";
import { CryptoSwap } from "./components/SwapWidget";
import { MessageFeed } from "./components/MessageFeed";

function App() {
  const [models, setModels] = useState([]);
  const [user, setUser] = useState('user');
  useEffect(() => {
    fetch("http://localhost:3012/models")
      .then((response) => response.json())
      .then((data) => {
        setModels(data.models.filter(model => model.id == 'gpt-3.5-turbo'))
      });
  }, []);
  return (
    <>
      <div className="flex">
        <div className="w-[20%] h-full absolute bg-gradient-to-bl from-sidebar-secondary to-sidebar-primary shadow-2xl">
          <CryptoSwap/>
        </div>
        <div className="w-[80%] h-full bg-gradient-to-br from-soft-light-blue to-gradient-blue absolute left-[20%] shadow-shadow-blue shadow-lg">
          
          <MessageFeed user={user}/>f
          <div className="absolute h-[10%] brightness-150 shadow-lg drop-shadow-md rounded-full bottom-0 bg-opacity-60 w-full bg-slate-600">
            <input className="outline-none tracking-wide p-6 font-nunito h-[90%] shadow-lg rounded-full drop-shadow-md text-2xl text-white bg-transparent relative top-0.5 left-3 backdrop-blur-lg text-center w-[98%]" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
