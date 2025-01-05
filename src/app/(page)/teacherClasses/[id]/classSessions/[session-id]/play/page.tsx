"use client";
import { Button } from "@/components/ui/button";
import { useGetDocFileDetails } from "@/hooks/useDocfiles";
import { useGetSessionDetails } from "@/hooks/useSessions";
import { MoveLeft, MoveRight, Send, StopCircle } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Card, CardContent } from "@/components/ui/card";

const socket = io("http://localhost:3001");

export default function SessionPlayPage() {
  const { "session-id": sessionId } = useParams();
  const [slide, setSlide] = useState(0);
  const [submitList, setSubmitList] = useState<
    { studentId: string; questionId: string; response: string }[]
  >([]);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [sessionMessage, setSessionMessage] = useState<string>("");
  const [isStopped, setStopped] = useState(false);
  const id = Array.isArray(sessionId) ? sessionId[0] : sessionId;
  const { data: sessionData } = useGetSessionDetails(id || "");
  const presentationId = sessionData?.data?.presentationId;
  const { data: docFileData } = useGetDocFileDetails(presentationId ?? "");

  useEffect(() => {
    if (!isStopped) {
      socket.emit("sendSlide", {
        sessionId: id,
        slideUrl: docFileData?.data?.url[slide],
      });
    }

    if (docFileData?.data?.questions) {
      const filteredQuestions = docFileData.data.questions.filter(
        (question) => question.orderInSlide === slide - 1
      );
      setQuestions(filteredQuestions);
    }
  }, [slide, isStopped, docFileData, id]);

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
    socket.emit("joinSession", {
      sessionId: id,
      userId: "teacher",
    });

    socket.on("updateSubmitList", (data) => {
      setSubmitList(data);
    });

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

  function stopPresentation() {
    setStopped(true);
    socket.emit("stopPresentation", { sessionId: id });
  }

  function resumePresentation() {
    setStopped(false);
    socket.emit("resumePresentation", { sessionId: id });
  }

  const sendQuestionToStudent = (question: QuestionData) => {
    socket.emit("sendQuestion", {
      sessionId,
      question: question,
    });
  };

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
          <Button
            className="bg-red-500 hover:bg-red-800"
            onClick={isStopped ? resumePresentation : stopPresentation}
          >
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
        <div>
          {questions.map((question) => (
            <Card>
              <CardContent className="flex justify-between pt-6">
                <div>{question.questionTitle}</div>
                <Button onClick={() => sendQuestionToStudent(question)}>
                  <Send />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="basis-1/2">
        <h2 className="text-xl font-bold mb-4">Submitted Answers</h2>
        <div className="space-y-4">
          {submitList.map((submission, index) => (
            <Card key={index}>
              <CardContent>
                <p>
                  <strong>Student ID:</strong> {submission.studentId}
                </p>
                <p>
                  <strong>Question ID:</strong> {submission.questionId}
                </p>
                <p>
                  <strong>Answer:</strong> {submission.response}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
