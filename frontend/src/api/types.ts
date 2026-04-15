export interface School {
  id: string;
  title: string;
  completed: boolean;
  address: string;
  contactEmail: string;
  contactPhone: string;
  note: string;
}

export interface ListSchoolsParams {
  page: number;
  limit: number;
}

export interface CreateSchoolBody {
  title: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  note: string;
}

export interface UpdateSchoolBody {
  title?: string;
  completed?: boolean;
  address?: string;
  contactEmail?: string;
  contactPhone?: string;
  note?: string;
}

export interface ApiErrorDetails {
  errors: string[];
}

export interface ApiError {
  statusCode: number;
  type: number;
  message: string;
  details?: ApiErrorDetails;
}

export interface AppApiError {
  statusCode: number;
  message: string;
  details?: ApiErrorDetails;
}