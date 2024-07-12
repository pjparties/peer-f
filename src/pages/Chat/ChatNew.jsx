import React from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { VscSend } from "react-icons/vsc";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


export const Chat = () => {
  // states for the chat
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isInRoom, setIsInRoom] = useState(false);
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState("");
  const [status, setStatus] = useState("Join a room to start chatting...");

  // extract preference from url forwarded by /preferences page
  const prefID = useParams().prefId;

  useEffect(() => {
    // console.log(prefID);
  }, []);

  // Connect to the socket server
  useEffect(() => {
    const newSocket = io("http://localhost:8000", {
      transports:
        ['websocket'],
    });
    if (newSocket) {
      newSocket.on("connect", () => {
        // console.log("Connected to the server");
        setSocket(newSocket);
        setSocketId(newSocket.id);
        setStatus("Connected to the server, join a room to start chatting...");
      });
      newSocket.on("searching", (data) => {
        // console.log(data);
        setStatus("Searching for a stranger to join...");
      });
      newSocket.on("chatStart", (data) => {
        // console.log(data);
        setIsInRoom(true);
        setStatus("You are now chatting with a stranger, say hi!");
        setMessages([]);
      });
      newSocket.on("strangerDisconnected", (data) => {
        // console.log(data);
        setIsInRoom(false);
        setStatus("Stranger disconnected, join a room to start chatting...");
      });
      newSocket.on("endChat", (data) => {
        // console.log(data);
        setIsInRoom(false);
        setMessages([]);
        setStatus("You left the room, join a room to start chatting...");
      });
    }
    handleJoinRoom(socketId);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Join a room
  const handleJoinRoom = (id) => {
    if (socket) {
      socket.emit("start", id)
    }
    else {
      console.log("Socket not connected")
    }
  };

  // Send a message
  const handleSendMessage = () => {
    if (socket && isInRoom) {
      socket.emit("newMessageToServer", chatMessage);
      const obj = { sender: "You", message: chatMessage };
      // console.log("Sent message: ", chatMessage);
      setChatMessage("");
    }
    else if (!isInRoom) {
      // console.log("You are not in a room. Please join a room first.");
      setStatus("You are not in a room. Please join a room first.");
      // setChatMessage("");
    }
    else {
      // console.log("Something went wrong either with socket or room")
      window.alert("Something went wrong either with socket or room");
      // setChatMessage("");
    }
  };

  // Receive a message
  const handleReceiveMessage = () => {
    socket.on("newMessageToClient", (data) => {
      const sender = data.id === socketId ? "You" : "Stranger";
      const receivedMessage = { sender, message: data.msg };
      // console.log("Received message: ", receivedMessage);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    });
  };

  // Listen for messages
  useEffect(() => {
    if (socket) {
      handleReceiveMessage()
    }
  }, [socket]);

  // Leave the room
  const handleLeaveRoom = () => {
    if (socket) {
      if (isInRoom) {
        socket.emit("stop");
        setIsInRoom(false);
        // console.log("Left room");
        setMessages([]);
      }
      else {
        setIsInRoom(false);
        setMessages([]);
      }
    }
    else {
      // console.log("Socket not connected")
      window.alert("Socket not connected")
    };
  }

  return (
    <>
      <Header />
      <div className="bgscreen flex h-screen w-screen flex-col items-center justify-center bg-primary py-16 px-24 font-Inter">
        {/* chat container */}
        <div className="chat-container flex flex-col items-center h-full w-full relative border border-gray-300 bg-white rounded-2xl">
          {/* status */}
          <p className="w-fit my-4 font-medium text-gray-800 transition duration-1000 ease-in">
            {status}
          </p>
          {/* all messages */}
          <div className="all-messages-here ">
            {/* real messages typed here */}
            {messages.map((message, index) => (
              <div key={index} className="message transition duration-300 ease-in mb-1">
                <span
                  className={`${message.sender === "You" ? "font-bold text-user1" : "font-bold text-user2"}`}
                >
                  {message.sender === "You" ? "You: " : "Stranger: "}
                </span>
                <span className="text-here w-5/6 "> {message.message} </span>
              </div>
            ))}
          </div>
          {/* bottom bar */}
          <div className="absolute flex bottom-3 bottom-row-wrapper max-w-fit gap-4 h-12 text-zinc">
            <button onClick={() => handleLeaveRoom()} className="leaveRoom rounded-xl text-base tracking-tight border-gray-100 bg-warning px-4 font-medium text-white transition duration-200 ease-in-out hover:bg-[#c1121f]">
              Leave Room
            </button>
            <input
              type="text"
              value={chatMessage}
              className="input-area bg-[#f2f2f2] min-h-fit pl-4 w-[50vw] lg:w-[60vw] rounded-lg border-2 border-gray-100 transition-all duration-400 ease-in-out"
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSendMessage(); // Call the handleSendMessage function
                }
              }}
              placeholder="Type your message..."
            />
            <button
              className="sendButton rounded-xl bg-secondary px-5 py-4 border-gray-100 font-bold text-gray-300 hover:text-white hover:border-white transition duration-200 ease-in-out"
              onClick={() => handleSendMessage()}
            >
              <VscSend />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
