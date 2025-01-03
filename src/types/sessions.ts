import { ApiResponse } from "./response-types";

export interface SessionData {
  data: SessionData;
  id: string;
  topic: string;
  description: string;
  status: "SCHEDULED" | "INPROGRESS" | "COMPLETED";
  sessionDate: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  classroomId: string;
  presentationId: string;
}

export interface UpdateSessionBody {
  topic?: string;
  description?: string;
  status?: "SCHEDULED" | "INPROGRESS" | "COMPLETED";
  sessionDate?: string;
  startTime?: string;
  endTime?: string;
  presentationId?: string;
}

export type SessionResponse = ApiResponse<SessionData>;
