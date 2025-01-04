import axios from "axios";
import axiosClient from "../axios-client";

export const createQuestion = async (data: CreateQuestionData) => {
  try {
    const response = await axiosClient.post("/questions", data);
    console.log(response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          "Error during create question: ",
          error.response.data.message + ": " + error.response.data.errors[0]
        );
      } else {
        console.error("Error with no response: ", error.message);
      }
    } else {
      console.error("General error during create question: ", error);
    }
    throw error;
  }
};

export const createChoice = async (
  questionId: string,
  data: CreateChoiceData
) => {
  try {
    const response = axiosClient.post(`/questions/${questionId}/choices`, data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          "Error during create choice: ",
          error.response.data.message + ": " + error.response.data.errors[0]
        );
      } else {
        console.error("Error with no response: ", error.message);
      }
    } else {
      console.error("General error during create choice: ", error);
    }
    throw error;
  }
};

export const updateQuestion = async (
  questionId: string,
  data: Partial<CreateQuestionData>
) => {
  try {
    const response = await axiosClient.patch(`/questions/${questionId}`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          "Error during update question: ",
          error.response.data.message + ": " + error.response.data.errors[0]
        );
      } else {
        console.error("Error with no response: ", error.message);
      }
    } else {
      console.error("General error during update question: ", error);
    }
    throw error;
  }
};

export const updateChoice = async (
  choiceId: string,
  data: Partial<CreateChoiceData>
) => {
  try {
    const response = await axiosClient.patch(`/choices/${choiceId}`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(
          "Error during update question: ",
          error.response.data.message + ": " + error.response.data.errors[0]
        );
      } else {
        console.error("Error with no response: ", error.message);
      }
    } else {
      console.error("General error during update question: ", error);
    }
    throw error;
  }
};
