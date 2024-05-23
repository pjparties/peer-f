import React from "react";
import { useState, useEffect } from "react";
import io from "socket.io-client";

export const Chat = () => {
    // states for the chat
    const [chatMessage, setChatMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isInRoom, setIsInRoom] = useState(false);
    const [socket, setSocket] = useState(null);
    const [socketId, setSocketId] = useState("");
    const [status, setStatus] = useState("Join a room to start chatting...");

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
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-omeglebg px-8">
            <div className="chat-container h-4/5 w-full rounded-lg border-x-2 border-y-2 border-gray-400 bg-white overflow-scroll">
                <p className="mb-4 ml-1 font-medium text-gray-800 transition duration-1000 ease-in">
                    {status}
                </p>
                <div className="all-messages-here ml-1 ">
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
            </div>
            <div className="bottom-row-wrapper ml-0 flex w-full items-center justify-center">
                <div className="" onClick={() => handleLeaveRoom()}>
                    <button className="ml-2 rounded-xl border-gray-500 bg-warning px-6 py-3 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-[#c1121f]">
                        Leave Room
                    </button>
                </div>
                <div
                    className=""
                    onClick={() => {
                        handleJoinRoom(socket.id);
                    }}
                >
                    <button className="ml-2 rounded-xl border-gray-500 bg-accentdark px-6 py-3 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-accentdark">
                        Join Room
                    </button>
                </div>
                <div className="input-area pl-4">
                    <input
                        type="text"
                        value={chatMessage}
                        className="h-16 w-[60vw] rounded-lg border-2 border-gray-400 px-2 py-1"
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
                        className="ml-2 rounded-xl border-gray-500 bg-accent px-4 py-4 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-accent"
                        onClick={() => handleSendMessage()}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};
