"use client";
import { Button } from "@/components/ui/button";
import { useGetDocFileDetails } from "@/hooks/useDocfiles";
import { useGetSessionDetails } from "@/hooks/useSessions";
import { MoveLeft, MoveRight, StopCircle } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function SessionPlayPage() {
  const { "session-id": sessionId } = useParams();
  const [slide, setSlide] = useState(0);
  const [sessionMessage, setSessionMessage] = useState<string>("");

  const id = Array.isArray(sessionId) ? sessionId[0] : sessionId;
  const { data: sessionData } = useGetSessionDetails(id || "");
  const presentationId = sessionData?.data?.presentationId;
  const { data: docFileData } = useGetDocFileDetails(presentationId ?? "");

  function nextSlide() {
    if (
      docFileData?.data?.url.length &&
      slide < docFileData?.data?.url.length - 1
    ) {
      setSlide(slide + 1);
    }
  }

  function prevSlide() {
    if (slide > 0) {
      setSlide(slide - 1);
    }
  }

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
    <div className="flex gap-5">
      <div className="basis-1/2">
        <Image
          className="rounded-lg"
          src={docFileData?.data?.url[slide] || "/elearning_pic.jpg"}
          width={1000}
          height={500}
          alt=""
        />
        <div className="flex justify-end gap-5 p-5">
          <Button className="bg-red-500 hover:bg-red-800">
            <StopCircle />
          </Button>
          <Button onClick={prevSlide} disabled={slide < 1}>
            <MoveLeft />
          </Button>
          <Button
            onClick={nextSlide}
            disabled={
              docFileData?.data?.url &&
              slide >= docFileData?.data?.url.length - 1
            }
          >
            <MoveRight />
          </Button>
        </div>
        <div>{docFileData?.data?.url.length}</div>
      </div>
      <div className="basis-1/2">Test</div>
    </div>
  );
}
