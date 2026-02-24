// lib/HttpError.ts
export interface HttpError extends Error {
  status?: number;
}
