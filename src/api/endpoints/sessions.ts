import { SessionResponse, UpdateSessionBody } from "@/types/sessions";
import axiosClient from "../axios-client";
import axios from "axios";

export const getSessionDetails = async (
  sessionId: string
): Promise<SessionResponse> => {
  try {
    const response = await axiosClient.get(`/sessions/${sessionId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          "Error during get session: ",
          error.response.data.message + ": " + error.response.data.errors[0]
        );
      } else {
        console.error("Error with no response: ", error.message);
      }
    } else {
      console.error("General error during get session: ", error);
    }
    throw error;
  }
};

export const updateSession = async (
  sessionId: string,
  updateSessionBody: UpdateSessionBody
) => {
  try {
    const response = await axiosClient.patch(
      `/sessions/${sessionId}`,
      updateSessionBody
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          "Error during update session: ",
          error.response.data.message + ": " + error.response.data.errors[0]
        );
      } else {
        console.error("Error with no response: ", error.message);
      }
    } else {
      console.error("General error during update session: ", error);
    }
    throw error;
  }
};

export const deleteSession = async (sessionId: string) => {
  try {
    const response = await axiosClient.delete(`/sessions/${sessionId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          "Error during delete session: ",
          error.response.data.message + ": " + error.response.data.errors[0]
        );
      } else {
        console.error("Error with no response: ", error.message);
      }
    } else {
      console.error("General error during delete session: ", error);
    }
    throw error;
  }
};
