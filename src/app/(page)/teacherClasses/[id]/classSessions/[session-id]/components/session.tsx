"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // Địa chỉ WebSocket server của bạn

const SessionComponent = () => {
  const [sessionMessage, setSessionMessage] = useState<string>("");

  useEffect(() => {
    socket.emit("joinSession", { sessionId: "session123", userId: "student1" });

    socket.on("sessionJoined", (data) => {
      setSessionMessage(data);
    });

    return () => {
      socket.emit("leaveSession", {
        sessionId: "session123",
        userId: "student1",
      });
      socket.off("sessionJoined");
    };
  }, []);

  return (
    <div>
      <h1>Session with Teacher</h1>
      <p>{sessionMessage}</p>
    </div>
  );
};

export default SessionComponent;
