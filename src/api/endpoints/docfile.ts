import axios from "axios";
import axiosClient from "../axios-client";
import { DocFileResponse } from "@/types/docfile-response";

export const getDocFileDetails = async (
  id: string
): Promise<DocFileResponse> => {
  try {
    const response = await axiosClient.get(`/docfiles/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          "Error during get docfile: ",
          error.response.data.message + ": " + error.response.data.errors[0]
        );
      } else {
        console.error("Error with no response: ", error.message);
      }
    } else {
      console.error("General error during get docfile: ", error);
    }
    throw error;
  }
};

export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosClient.post("/docfiles/upload", formData, {
      timeout: 6000000,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          "Error during upload file: ",
          error.response.data.message + ": " + error.response.data.errors[0]
        );
      } else {
        console.error("Error with no response: ", error.message);
      }
    } else {
      console.error("General error during upload file: ", error);
    }
    throw error;
  }
};
