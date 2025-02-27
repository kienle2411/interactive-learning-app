"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { useUploadFile } from "@/hooks/useDocfiles";
import { File, X } from "lucide-react";
import React, { useRef, useState } from "react";

interface IUploadFileProps {
  typeAccept: string;
  onUploadSuccess?: (presentationId: string) => void;
}

export default function UploadFile({
  typeAccept,
  onUploadSuccess,
}: IUploadFileProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutate: uploadFile, status } = useUploadFile({
    onUploadSuccess: (response) => {
      console.log("Upload successful! Response:", response);
      if (onUploadSuccess) {
        onUploadSuccess(response);
      }
    },
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log("upload");
      uploadFile(selectedFile);
      console.log();
    }
  };

  const handleClear = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.stopPropagation();
    setSelectedFile(null);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="text-xl">Upload a Presentation File </div>
          </CardTitle>
          <CardDescription>
            Select a file to upload then using the upload button below
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4 justify-center">
          <div
            className="flex flex-col p-[20px] border-dashed border-2 border-gray-300 rounded-lg items-center space-y-2 cursor-pointer"
            onClick={handleClick}
          >
            {selectedFile ? (
              <div className="flex space-x-5">
                <div className="text-muted-foreground">{selectedFile.name}</div>
                <X strokeWidth={1.5} color="#737373" onClick={handleClear} />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <File color="#737373" />
                <div className="text-muted-foreground">
                  Upload a file or drag and drop
                </div>
              </div>
            )}
            <Input
              type="file"
              accept={typeAccept}
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <LoadingButton loading={status === "pending"} onClick={handleUpload}>
            Upload
          </LoadingButton>
        </CardContent>
      </Card>
    </div>
  );
}
