import type School from '../models/school';

export interface ListSchoolsRequest {
  page: number;
  limit: number; // number of results per page
}

export interface PaginatedSchoolsResult {
  data: School[];
  total: number;
  page: number;
  limit: number;
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
