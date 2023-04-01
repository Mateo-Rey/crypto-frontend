import React, { useState } from "react";

export const RegisterModal = ({
  show,
  setShow,
  setSwitchShow,
  switchShow,
  user,
  setUser,
  setTokens,
}) => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (
      password.length < 8 ||
      !password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    ) {
      setError(
        "Password must be at least 8 characters, contain an uppercase letter, and contain a number."
      );
    } else if (password !== confirmPassword) {
      setError("Passwords must match");
    } else {
      fetch("http://localhost:3012/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setTokens(data[1]);
          setUser(data[0]);
          setShow(false)
          setSwitchShow(!switchShow);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="absolute backdrop-blur top-0 bottom-0 left-0 flex items-center place-content-center right-0">
      <div className="effect-black w-[85%] font-nunito md:w-[30%] h-[75%] flex flex-col place-content-evenly p-6 text-white rounded-2xl outline outline-4 outline-white absolute">
        <form
          className="relative flex flex-col place-content-evenly h-[50%]"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex text-center flex-col">
            <label>Email</label>
            <input
              className="effect-blue-inner text-white h-8 my-2 px-4 rounded-3xl"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex text-center flex-col">
            <label>Password</label>
            <input
              className="effect-blue-inner my-2 text-white h-8 px-4 rounded-3xl"
              type="text"
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex text-center flex-col">
            <label>Confirm Password</label>
            <input
              className="effect-blue-inner my-2 text-white h-8 px-4 rounded-3xl"
              type="password"
              required={true}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <p className="text-center">{error}</p>
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => setSwitchShow(!switchShow)}>Login</button>
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
