import React from "react";
import cryptoavatar from "../assets/cryptoavatar.jpg";
import {CodeParagraph} from "./Code.jsx";
export const ChatMessage = ({ message }) => {
  
  if (message.role !== "system") {
    return (
      <>
        <div className="outline effect-purple w-[80%] md:max-w-fit text-white/80 outline-white p-4 my-4 outline-4 self-center ease-in-out rounded-lg">
          <div className="flex flex-col items-center">
            <div className="flex items-center align-center place-content-center text-center font-nunito space-x-2">
              {message.role === "assistant" && (
                <img className="rounded" src={cryptoavatar} />
              )}
              <div className="font-nunito text-xl">{message.role}</div>
            </div>
            <div className="w-[100%] text-lg text-center break-normal">
              <CodeParagraph text={message.content}/>
        </div>
          </div>
        </div>
      </>
    );
  }
};
