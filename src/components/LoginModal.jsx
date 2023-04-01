import React, { useState } from "react";

export const LoginModal = ({
  show,
  setShow,
  setSwitchShow,
  switchShow,
  user,
  setUser,
  setTokens,
}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  console.log(email, password);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      password.length < 8 ||
      !password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    ) {
      setError("Password must be at least 8 characters, contain an uppercase letter, and contain a number.");
    } else {
      await fetch("http://localhost:3012/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data[0]);
          setTokens(data[1]);
          setShow(!show);
        });
    }
  };

  return (
    <div className="absolute backdrop-blur top-0 bottom-0 left-0 flex items-center place-content-center right-0">
      <div className="effect-black w-[85%] md:w-[30%] h-[75%] flex flex-col place-content-evenly p-6 text-white rounded-2xl outline outline-4 outline-white absolute">
        <form
          className="relative flex flex-col font-nunito place-content-evenly h-[50%]"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex text-center flex-col">
            <label>Email</label>
            <input
              className="effect-blue-inner text-white h-8 my-2 px-4 rounded-3xl"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex text-center flex-col">
            <label>Password</label>
            <input
              className="effect-blue-inner my-2 text-white h-8 px-4 rounded-3xl"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>{error && <p className="text-center">{error}</p>}</div>
          <button type="submit" value="submit">
            Submit
          </button>
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
