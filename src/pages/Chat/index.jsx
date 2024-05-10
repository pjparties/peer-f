import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";

export const Chat = () => {
    // states for the chat
    const [errorMessages, setErrorMessages] = useState([]);
    const [chatMessage, setChatMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isInRoom, setIsInRoom] = useState(false);
    const [socket, setSocket] = useState(null);
    const [socketId, setSocketId] = useState("");

    // Connect to the socket server
    useEffect(() => {
        const newSocket = io("http://localhost:8000", {
            transports:
                ['websocket'],
        });
        if (newSocket) {
            newSocket.on("connect", () => {
                console.log("Connected to the server");
                setSocket(newSocket);
                setSocketId(newSocket.id);
            });
            newSocket.on("searching", (data) => {
                console.log(data);
            });
            newSocket.on("chatStart", (data) => {
                console.log(data);
                setIsInRoom(true);
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
            console.log("Sent message: ", chatMessage);
            setChatMessage("");
        }
        else if (!isInRoom) {
            setErrorMessages([
                { message: "You are not in a room. Please join a room first." },
            ]);
            // setChatMessage("");
        }
        else {
            console.log("Something went wrong either with socket or room")
            // setChatMessage("");
        }
    };

    // Receive a message
    const handleReceiveMessage = () => {
        if (socketId !== "") {
            socket.on("newMessageToClient", (data) => {
                const sender = data.id === socketId ? "You" : "Stranger";
                const receivedMessage = { sender, message: data.msg };
                // console.log("Received message: ", receivedMessage);
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            });
        }
    };


    // Listen for messages
    useEffect(() => {
        if (isInRoom) {
            if (socket) {
                handleReceiveMessage();
            } 
        }
    }, [socket]);

    // Leave the room
    const handleLeaveRoom = () => {

    };

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center bg-omeglebg px-8">
            <div className="chat-container h-4/5 w-full rounded-lg border-x-2 border-y-2 border-gray-400 bg-white">
                <p className="mb-4 ml-1 font-medium text-gray-800">
                    You're now chatting with a random stranger. Say hi!
                </p>
                <div className="all-messages-here ml-1">
                    <div className="message transition duration-300 ease-in">
                        {/* error messages conditionally rendered */}
                        {messages.length == 0 &&
                            errorMessages.map((message, index) => (
                                <div key={index}>
                                    <span className="font-bold text-warning">Error: </span>
                                    <text className="font-bold text-warning">
                                        {message.message}
                                    </text>
                                </div>
                            ))}
                        {/* real messages typed here */}
                        {messages.map((message, index) => (
                            <div key={index}>
                                <span
                                    className={`${message.sender === "You" ? "font-bold text-user1" : "font-bold text-user2"}`}
                                >
                                    {message.sender === "You" ? "You: " : "Stranger: "}
                                </span>
                                <text className="text-here">{message.message}</text>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="bottom-row-wrapper ml-0 flex w-full items-center justify-center">
                <div className="" onClick={() => handleLeaveRoom}>
                    <Link href="/home">
                        <button className="ml-2 rounded-xl border-gray-500 bg-warning px-6 py-3 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-[#c1121f]">
                            Leave Room
                        </button>
                    </Link>
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
                                () => handleSendMessage();
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
