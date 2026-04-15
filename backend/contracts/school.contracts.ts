export interface ListSchoolsRequest {
  page: number;
  limit: number; // number of results per page
}

export interface CreateSchoolRequest {
  title: string;
  address: string;
  contactEmail: string;
  contactPhone: string;
  note: string;
}

export interface UpdateSchoolRequest {
  id: string;
  title?: string;
  completed?: boolean;
  address?: string;
  contactEmail?: string;
  contactPhone?: string;
  note?: string;
}
