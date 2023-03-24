import React, { useEffect, useState } from "react";
import { ChatMessage } from "./ChatMessage";
export const MessageFeed = ({ user }) => {
  const [messageList, setMessageList] = useState([
    { name: "ai", message: "Hello World!" },
  ]);
  console.log(messageList);
  return (
    <>
      <div>
        {messageList.map((message) => {
          if (message.name == "ai") {
            return <ChatMessage name={"AI"} message={message.message} />;
          } else if (message.name == `${user}`) {
            return <ChatMessage name={user} message={message.message} />;
          }
        })}
      </div>
    </>
  );
};
