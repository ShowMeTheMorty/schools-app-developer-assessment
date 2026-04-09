// what we need to make a school
interface CreateSchoolRequest {
  title: string;
}

// what we need to change a school
interface UpdateSchoolRequest {
  title?: string;
  completed?: boolean;
}

export { CreateSchoolRequest, UpdateSchoolRequest };