import React from "react";
import cryptoavatar from "../assets/cryptoavatar.jpg";
export const ChatMessage = ({ message }) => {
  if (message.role !== "system") {
    return (
      <>
        <div className="outline text-white p-2 my-2 outline-4 outline-input-outline bg-input-primary bg-opacity-80 ease-in-out shadow-lg rounded-lg">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-3">
              {message.role === "assistant" && (
                <img className="rounded" src={cryptoavatar} />
              )}
              <div className="font-nunito">{message.role}</div>
            </div>
            <div className="font-nunito">{message.content}</div>
          </div>
        </div>
      </>
    );
  }
};
