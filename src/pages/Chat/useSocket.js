import { useState, useEffect } from "react";
import io from "socket.io-client";

const useSocket = (setIsInRoom, setStatus, setMessages) => {
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const newSocket = io(backendUrl, {
      transports: ['websocket'],
    });

    if (newSocket) {
      newSocket.on("connect", () => {
        setSocket(newSocket);
        setSocketId(newSocket.id);
        setStatus("Connected to the server...");
      });

      newSocket.on("searching", () => {
        setStatus("Searching for a stranger to join...");
      });

      newSocket.on("chatStart", () => {
        setIsInRoom(true);
        setStatus("You are now chatting with a stranger, say hi!");
        setMessages([]);
      });

      newSocket.on("strangerDisconnected", () => {
        setIsInRoom(false);
        setStatus("Stranger disconnected, Join a room to start chatting...");
      });

      newSocket.on("endChat", () => {
        setIsInRoom(false);
        setMessages([]);
        setStatus("You left the room, Join a room to start chatting...");
      });

      // handleReceiveMessage
      newSocket.on("newMessageToClient", (data) => {
        const newMessage = {
          sender: data.id === newSocket.id ? "You" : "Stranger",
          text: data.msg,
          timestamp: new Date().getTime()
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleJoinRoom = (id) => {
    if (socket) {
      socket.emit("start", id);
    }
  };

  const handleLeaveRoom = () => {
    if (socket) {
      socket.emit("stop");
      setIsInRoom(false);
      setMessages([]);
    }
  };

  const handleSendMessage = (message) => {
    if (socket) {
      // Do not add message to state. only emit the message to the server
      socket.emit("newMessageToServer", message);
    }
  };

  return { socket, socketId, handleJoinRoom, handleLeaveRoom, handleSendMessage };
};

export default useSocket;