import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import ChatMessages from "./ChatMessages.jsx";
import ChatInput from "./ChatInput.jsx";
import StatusBar from "./StatusBar.jsx";
import useSocket from "./useSocket.js";

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [isInRoom, setIsInRoom] = useState(false);
  const [status, setStatus] = useState("Waiting for server connection...");
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
            handleJoinRoomInChat={() => handleJoinRoom(socketId)}

          />
        </div>
      </div>
      <Footer />
    </>
  );
};