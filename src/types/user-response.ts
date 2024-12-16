import { MediaData } from "./media-response";
import { ApiResponse } from "./response-types";

export interface ProfileData {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  school: string;
  gender: "MALE" | "FEMALE" | "ORTHER";
  profileDescription: string | null;
  mediaId: string;
  profilePicture: MediaData;
}

export interface ProfileUpdateBody {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  email?: string;
  phone?: string;
  school?: string;
  gender?: string;
  profileDescription?: string;
}

export type ProfileResponse = ApiResponse<ProfileData>;
