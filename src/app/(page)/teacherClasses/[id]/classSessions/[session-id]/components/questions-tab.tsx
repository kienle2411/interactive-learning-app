"use client";
import React from "react";
import UploadFile from "./upload-file";
import { useRouter } from "next/navigation";
import { useGetSessionDetails, useUpdateSession } from "@/hooks/useSessions";
import { useGetDocFileDetails } from "@/hooks/useDocfiles";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import QuestionForm from "./create-question-form";

interface IQuestionsTabProps {
  id: string;
}

export default function QuestionsTab({ id }: IQuestionsTabProps) {
  const { data: sessionData } = useGetSessionDetails(id);
  const { mutate: updateSession } = useUpdateSession(id);
  const presentationId = sessionData?.data?.presentationId;
  const { data: docFileData } = useGetDocFileDetails(presentationId ?? "");

  const handleUploadSuccess = (response: any) => {
    const newPresentationId = response?.data?.docFile?.id;
    if (newPresentationId) {
      updateSession({ presentationId: newPresentationId });
    }
  };

  if (!sessionData?.data?.presentationId) {
    console.log(sessionData?.data);
    return (
      <UploadFile typeAccept=".pptx" onUploadSuccess={handleUploadSuccess} />
    );
  }
  return (
    <div className="w-full">
      {Array.isArray(docFileData?.data?.url) ? (
        docFileData.data.url.map((url, index) => {
          const existingQuestion = docFileData?.data?.questions?.find(
            (q) => q.orderInSlide === index
          );
          return (
            <div key={index} className="flex justify-center p-4 gap-5 w-full">
              <Card className="basis-1/2">
                <CardTitle>
                  <div className="p-5">Slide {index + 1}</div>
                </CardTitle>
                <CardContent>
                  <Image src={url} width={700} height={300} alt="" />
                </CardContent>
                <CardDescription></CardDescription>
              </Card>
              <div className="basis-1/2">
                <QuestionForm
                  docFileId={presentationId || ""}
                  order={index}
                  question={existingQuestion}
                />
              </div>
            </div>
          );
        })
      ) : (
        <div>No URLs available</div>
      )}
    </div>
  );
}
