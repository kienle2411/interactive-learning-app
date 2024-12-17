import { signIn, signUp } from "@/api/endpoints/auth";
import { useMutation } from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const useSignIn = (router: AppRouterInstance) => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      console.log("SignIn successful", data);
      router.push("/teacherClasses");
    },
    onError: (error) => {
      console.log("SignIn failed", error);
    },
  });
};

export const useSignUp = (router: AppRouterInstance) => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      router.push("/login");
    },
    onError: (error) => {
      console.log("Sign up failed", error);
    },
  });
};
