import { signIn, signUp } from "@/api/endpoints/auth";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
// 
export const useSignIn = (router: AppRouterInstance) => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: async (data) => {
      console.log("SignIn successful", data);
      const accessToken = Cookies.get("accessToken");
      try {
        if (accessToken) {
          const decodedToken = jwt.decode(accessToken);

          if (decodedToken && typeof decodedToken !== "string") {
            const roleId = decodedToken.roleId;
            if (roleId === "teacher")
              router.push("/teacherClasses");
            else
              router.push("/studentClasses");
          }
        }
      } catch (error) {
        console.error("Failed to get cookie", error);
      }

    },
    onError: (error) => {
      console.log("SignIn failed", error);
    },
  });
};

export const useSignUp = (router: AppRouterInstance) => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      console.log("Sign up failed", error);
    },
  });
};
