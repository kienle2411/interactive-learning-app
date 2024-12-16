import axios from "axios";
import axiosClient from "../axios-client";
import Cookies from "js-cookie";

export const signIn = async (data: { username: string; password: string }) => {
  try {
    const response = await axiosClient.post("/auth/signin", data);
    console.log(response.data.status);
    if (response.data.status === "success") {
      console.log("access");
      console.log(response.data.data.accessToken);
      const { accessToken, refreshToken } = response.data.data;

      if (typeof accessToken !== "string" || typeof refreshToken !== "string") {
        throw new Error("Tokens are not strings");
      }

      Cookies.set("accessToken", String(accessToken), { sameSite: "strict" });
      Cookies.set("refreshToken", String(refreshToken), { sameSite: "strict" });

      console.log("Login successful, tokens saved to cookies");
      return response.data;
    } else {
      console.log(response.data.errors);
      throw new Error(response.data.errors);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          "Error during login: ",
          error.response.data.message + ": " + error.response.data.errors[0]
        );
      } else {
        console.error("Error with no response: ", error.message);
      }
    } else {
      console.error("General error during login: ", error);
    }
    throw error;
  }
};

export const refreshToken = async () => {
  const response = await axiosClient.post("/auth/refresh");
  return response.data;
};
