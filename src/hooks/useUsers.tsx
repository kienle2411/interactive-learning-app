import { getProfile, updateProfile } from "@/api/endpoints/users";
import queryClient from "@/api/query-client";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: 0,
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile"],
      });
    },
    onError: (error) => {},
    onSettled: () => {},
  });
};
