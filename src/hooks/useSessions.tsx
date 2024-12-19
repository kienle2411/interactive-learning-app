import {
  deleteSession,
  getSessionDetails,
  updateSession,
} from "@/api/endpoints/sessions";
import queryClient from "@/api/query-client";
import { UpdateSessionBody } from "@/types/sessions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const useGetSessionDetails = (sessionId: string) => {
  return useQuery({
    queryKey: ["session", sessionId],
    queryFn: () => getSessionDetails(sessionId),
    retry: 0,
  });
};

export const useUpdateSession = (sessionId: string) => {
  return useMutation({
    mutationFn: (updatedSession: Partial<UpdateSessionBody>) =>
      updateSession(sessionId, updatedSession),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["session", sessionId],
      });
      toast({
        variant: "success",
        title: "Success",
        description: "Session Updated!",
        duration: 1000,
      });
    },
    onError: (error) => {
      throw error;
    },
  });
};

export const useDeleteSession = (
  sessionId: string,
  router: AppRouterInstance
) => {
  return useMutation({
    mutationFn: () => deleteSession(sessionId),
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Success",
        description: "Session Deleted!",
        duration: 1000,
      });
      router.back();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
        duration: 1000,
      });
    },
  });
};
