import React from 'react';
import { useState, useEffect } from 'react';
import {io} from 'socket.io-client';

export const Test = () => {

    const [socket, setSocket] = useState(null);

    // Connect to the socket server
    useEffect(() => {
        const newSocket = io("http://localhost:8000"); // Replace with your backend URL
        setSocket(newSocket);

        
        socket?.on("connect", () => {
            console.log("Connected to the server");
            console.log(newSocket.id);
        });

        socket?.emit("hello", () => {
            console.log("Hello from the server");
        });




        return () => {
            newSocket.disconnect();
        };
    }, []);

    return (
        <div>Testing here</div>
    )
}
