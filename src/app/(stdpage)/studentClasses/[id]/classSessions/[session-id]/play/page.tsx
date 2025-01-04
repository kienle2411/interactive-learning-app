"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { io } from "socket.io-client";
import { useParams } from "next/navigation";

const socket = io("http://localhost:3001");

export default function StudentScreen() {
  const { "session-id": sessionId } = useParams();
  const id = Array.isArray(sessionId) ? sessionId[0] : sessionId;
  const [currentSlide, setCurrentSlide] = useState<string | null>(null);

  useEffect(() => {
    socket.emit("joinSession", { sessionId: id, userId: "student1" });

    socket.on("receiveSlide", ({ slideUrl }) => {
      setCurrentSlide(slideUrl);
    });
    console.log(currentSlide);

    return () => {
      socket.emit("leaveSession", {
        sessionId: "session123",
        userId: "student1",
      });
      socket.off("receiveSlide");
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {currentSlide ? (
        <Image
          className="rounded-lg"
          src={currentSlide}
          width={1000}
          height={500}
          alt="Presentation Slide"
        />
      ) : (
        <p>No slide to display</p>
      )}
    </div>
  );
}
