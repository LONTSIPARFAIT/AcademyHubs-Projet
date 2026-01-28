// types/index.ts
export * from './course';
export * from './user';
export * from './auth';
export * from './common';

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};

export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}