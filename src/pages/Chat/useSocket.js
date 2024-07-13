import { useState, useEffect } from "react";
import io from "socket.io-client";

const useSocket = (setIsInRoom, setStatus, setMessages) => {
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState("");

  useEffect(() => {
    const newSocket = io("http://localhost:8000", {
      transports: ['websocket'],
    });

    if (newSocket) {
      newSocket.on("connect", () => {
        setSocket(newSocket);
        setSocketId(newSocket.id);
        setStatus("Connected to the server, join a room to start chatting...");
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
        setStatus("Stranger disconnected, join a room to start chatting...");
      });

      newSocket.on("endChat", () => {
        setIsInRoom(false);
        setMessages([]);
        setStatus("You left the room, join a room to start chatting...");
      });

      newSocket.on("newMessageToClient", (data) => {
        const sender = data.id === socketId ? "You" : "Stranger";
        const receivedMessage = {
          sender,
          text: data.msg,
          timestamp: new Date().getTime() // Add timestamp here
        };
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
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
      socket.emit("newMessageToServer", message);
      const newMessage = {
        sender: "you",
        text: message,
        timestamp: new Date().getTime()
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  return { socket, socketId, handleJoinRoom, handleLeaveRoom, handleSendMessage };
};

export default useSocket;