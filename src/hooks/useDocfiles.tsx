import { getDocFileDetails, uploadFile } from "@/api/endpoints/docfile";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { AxiosError } from "axios";
import { useState } from "react";

export const useGetDocFileDetails = (id: string) => {
  return useQuery({
    queryKey: ["docfile", id],
    queryFn: () => getDocFileDetails(id),
    retry: 0,
    enabled: !!id,
  });
};

export const useUploadFile = ({
  onUploadSuccess,
}: {
  onUploadSuccess?: (response: any) => void;
}) => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: uploadFile,
    onSuccess: (response) => {
      toast({
        variant: "success",
        title: "Success",
        description: "File uploaded!",
        duration: 1000,
      });
      if (onUploadSuccess) {
        onUploadSuccess(response);
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast({
          variant: "destructive",
          title: "Failed!",
          description: error.response?.data.errors[0],
          duration: 10000,
        });
        return;
      }
      toast({
        variant: "destructive",
        title: "Failed!",
        description: error.message,
        duration: 10000,
      });
    },
    onSettled: () => {},
  });
};
