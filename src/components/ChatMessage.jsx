import React from "react";
import cryptoavatar from "../assets/cryptoavatar.jpg";
import {CodeParagraph} from "./Code.jsx";
export const ChatMessage = ({ message }) => {
  
  if (message.role !== "system") {
    return (
      <>
        <div className="outline text-white p-2 my-2 outline-4 md:w-[75%] outline-input-outline self-center bg-input-primary bg-opacity-80 ease-in-out shadow-lg rounded-lg">
          <div className="flex flex-col items-center">
            <div className="flex items-center font-nunito space-x-3">
              {message.role === "assistant" && (
                <img className="rounded" src={cryptoavatar} />
              )}
              <div className="font-nunito">{message.role}</div>
            </div>
            <div className="w-[75%] break-normal">
              <CodeParagraph text={message.content}/>
        </div>
          </div>
        </div>
      </>
    );
  }
};
