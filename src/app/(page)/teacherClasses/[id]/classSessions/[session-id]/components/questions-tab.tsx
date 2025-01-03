"use client";
import React, { useRef, useState } from "react";
import UploadFile from "./upload-file";
import { useRouter } from "next/navigation";
import {
  useDeleteSession,
  useGetSessionDetails,
  useUpdateSession,
} from "@/hooks/useSessions";
import { useGetDocFileDetails } from "@/hooks/useDocfiles";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

interface IQuestionsTabProps {
  id: string;
}

export default function QuestionsTab({ id }: IQuestionsTabProps) {
  const router = useRouter();
  const { data: sessionData, isLoading, isError } = useGetSessionDetails(id);
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
    <div>
      {Array.isArray(docFileData?.data?.url) ? (
        docFileData.data.url.map((url, index) => (
          <div key={index} className="flex justify-center p-4">
            <Card>
              <CardTitle>
                <div className="p-5">Slide {index + 1}</div>
              </CardTitle>
              <CardContent>
                <Image src={url} width={500} height={300} alt="" />
              </CardContent>
              <CardDescription></CardDescription>
            </Card>
          </div>
        ))
      ) : (
        <div>No URLs available</div>
      )}
    </div>
  );
}
