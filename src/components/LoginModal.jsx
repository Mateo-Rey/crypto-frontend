import React from "react";

export const LoginModal = ({ show, setShow, setSwitchShow, switchShow }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="absolute backdrop-blur top-0 bottom-0 left-0 flex items-center place-content-center right-0">
      <div className="effect-black w-[85%] md:w-[30%] h-[75%] flex flex-col place-content-evenly p-6 text-white rounded-2xl outline outline-4 outline-white absolute">
        <form className="relative flex flex-col place-content-evenly h-[50%]" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex text-center flex-col">
            <label>Email</label>
            <input
              className="effect-blue-inner text-white h-8 my-2 px-4 rounded-3xl"
              type="email"
            />
          </div>
          <div className="flex text-center flex-col">
            <label>Password</label>
            <input
              className="effect-blue-inner my-2 text-white h-8 px-4 rounded-3xl"
              type="password"
            />
          </div>
        </form>
        <button onClick={() => setSwitchShow(!switchShow)}>Register</button>
        <button
          className="effect-purple-inner place-self-center text-center text-xl text-white transition-all active:scale-[90%] active:border-2 p-1 rounded-full bg-chat-primary w-32 h-16"
          onClick={() => setShow(!show)}
        >
          Close Login
        </button>
      </div>
    </div>
  );
};
