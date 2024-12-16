import axios from "axios";
import axiosClient from "../axios-client";
import { ProfileResponse, ProfileUpdateBody } from "@/types/user-response";

export const getProfile = async (): Promise<ProfileResponse> => {
  try {
    const response = await axiosClient.get("/users/profile");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          "Error during get profile: ",
          error.response.data.message + ": " + error.response.data.errors[0]
        );
      } else {
        console.error("Error with no response: ", error.message);
      }
    } else {
      console.error("General error during get profile: ", error);
    }
    throw error;
  }
};

export const updateProfile = async (profileUpdateBody: ProfileUpdateBody) => {
  try {
    const response = await axiosClient.patch(
      "/users/profile",
      profileUpdateBody
    );
    return response;
  } catch (error) {}
};
