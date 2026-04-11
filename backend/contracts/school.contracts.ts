interface ListSchoolsRequest {
  page: number;
  limit: number; // number of results per page
}

interface CreateSchoolRequest {
  title: string;
}

interface UpdateSchoolRequest {
  id: string;
  title?: string;
  completed?: boolean;
}

enum SchoolErrorType {
  NotFound,
  ValidationError,
  InternalError,
  DuplicateError,
}

interface SchoolError {
  type: SchoolErrorType;
  message: string;
}

const schoolError = (type: SchoolErrorType, message: string): SchoolError => ({
  type,
  message,
});

export { 
  CreateSchoolRequest, 
  UpdateSchoolRequest,
  schoolError,
  SchoolErrorType,
  type SchoolError,
};