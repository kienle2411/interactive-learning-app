"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { io } from "socket.io-client";
import { useParams } from "next/navigation";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";

const socket = io("http://localhost:3001");

export default function StudentScreen() {
  const { "session-id": sessionId } = useParams();
  const [response, setResponse] = useState<string>("");
  const [questionShow, setQuestionShow] = useState<QuestionData>();
  const id = Array.isArray(sessionId) ? sessionId[0] : sessionId;
  const [currentSlide, setCurrentSlide] = useState<string | null>(null);
  useEffect(() => {
    socket.emit("joinSession", { sessionId: id, userId: "student1" });

    socket.on("receiveSlide", ({ slideUrl }) => {
      setCurrentSlide(slideUrl);
      setQuestionShow(undefined);
    });

    socket.on("receiveQuestion", ({ question }) => {
      setQuestionShow(question);
      console.log("Received question:", question);
    });

    console.log(currentSlide);

    return () => {
      socket.emit("leaveSession", {
        sessionId: "session123",
        userId: "student1",
      });
      socket.off("receiveSlide");
      socket.off("receiveQuestion");
    };
  }, []);

  const handleResponseQuestion = () => {
    socket.emit("submitAnswer", {
      sessionId: id,
      userId: "student1",
      questionId: questionShow?.id,
      response: response,
    });
    console.log("Submitted response:", response);
  };

  return (
    <div className="flex-col items-center w-full">
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
      {questionShow && (
        <Card className="p-5 space-y-2">
          <CardTitle>{questionShow?.questionTitle}</CardTitle>
          <CardContent>{questionShow?.content}</CardContent>
          {questionShow.questionType === "CHOICE" && (
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              {questionShow.options.map((option, index) => (
                <div
                  key={index}
                  className="bg-gray-300 p-4 rounded-lg hover:cursor-pointer"
                >
                  {option.content}
                </div>
              ))}
            </div>
          )}
          {questionShow.questionType === "TEXT" && (
            <div className="flex-col w-full justify-end space-y-5">
              <Textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Write your answer here..."
              />
              <Button className="w-full" onClick={handleResponseQuestion}>
                Submit
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
