import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import ChatMessages from "./ChatMessages.jsx";
import ChatInput from "./ChatInput.jsx";
import StatusBar from "./StatusBar.jsx";
import useSocket from "./useSocket.js";

export const Chat = () => {
  const [messages, setMessages] = useState([{ sender: "you", text: "Say hi to start chatting...", timestamp: new Date().getTime() },
  { sender: "stranger", text: "Hello! How are you?", timestamp: new Date().getTime() },
  { sender: "you", text: "I'm good, thanks! How about you?", timestamp: new Date().getTime() },
  { sender: "stranger", text: "I'm good too. What are you up to?", timestamp: new Date().getTime() },
  { sender: "you", text: "Nothing much, just chilling. How about you?", timestamp: new Date().getTime() },
  { sender: "stranger", text: "Same here. What do you do for a living?", timestamp: new Date().getTime() },
  { sender: "you", text: "I'm a software engineer. What about you?", timestamp: new Date().getTime() },
  { sender: "stranger", text: "I'm a student. I'm studying computer science.", timestamp: new Date().getTime() },
  { sender: "you", text: "That's cool! How do you like it?", timestamp: new Date().getTime() },
  { sender: "stranger", text: "It's great! I love coding.", timestamp: new Date().getTime() },
  { sender: "you", text: "Me too! What languages do you code in?", timestamp: new Date().getTime() },
  { sender: "stranger", text: "I code in Python, Java, and JavaScript. What about you?", timestamp: new Date().getTime() },
  { sender: "you", text: "I code in JavaScript, Python, and Ruby. I love Ruby!", timestamp: new Date().getTime() },
  { sender: "stranger", text: "That's cool! I've never tried Ruby before. What's it like?", timestamp: new Date().getTime() },
  { sender: "you", text: "It's a great language! It's very elegant and easy to read.", timestamp: new Date().getTime() },
  { sender: "stranger", text: "I'll have to check it out sometime. Thanks for the recommendation!", timestamp: new Date().getTime() },
  { sender: "you", text: "No problem! Let me know if you need any help with it.", timestamp: new Date().getTime() },
  { sender: "stranger", text: "Will do! Thanks again!", timestamp: new Date().getTime() },
  { sender: "you", text: "You're welcome! Have a great day!", timestamp: new Date().getTime() },
  ]);
  const [isInRoom, setIsInRoom] = useState(false);
  const [status, setStatus] = useState("Join a room to start chatting...");
  const prefID = useParams().prefId;

  const { socket, socketId, handleJoinRoom, handleLeaveRoom, handleSendMessage } = useSocket(
    setIsInRoom,
    setStatus,
    setMessages
  );

  useEffect(() => {
    if (socket) {
      handleJoinRoom(socketId);
    }
  }, [socket, socketId]);

  return (
    <>
      <Header />
      <div className="bgscreen flex h-screen w-screen flex-col items-center justify-center bg-primary py-16 px-24 font-Inter">
        <div className="chat-container flex flex-col items-center h-full w-full relative border border-gray-300 bg-white rounded-2xl">
          <StatusBar status={status} />
          <ChatMessages messages={messages} />
          <ChatInput
            isInRoom={isInRoom}
            handleSendMessage={handleSendMessage}
            handleLeaveRoom={handleLeaveRoom}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};