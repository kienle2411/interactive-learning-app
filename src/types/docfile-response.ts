import { ApiResponse } from "./response-types";

export interface DocFileData {
  id: string;
  fileName: string;
  type: string;
  path: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  url: string[];
  submissionId: string;
}

export type DocFileResponse = ApiResponse<DocFileData>;
