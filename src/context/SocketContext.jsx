import React, { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const API_ENDPOINT = "http://localhost:5500"; //Hardcoded
    const newSocket = io(API_ENDPOINT);

    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server");
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
      setIsConnected(false);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Connection Error:", error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
