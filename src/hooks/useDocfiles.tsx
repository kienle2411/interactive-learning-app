import { uploadFile } from "@/api/endpoints/docfile";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { AxiosError } from "axios";

export const useUploadFile = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Success",
        description: "File uploaded!",
        duration: 1000,
      });
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
