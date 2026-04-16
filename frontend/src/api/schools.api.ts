import httpClient from './axiosClient';
import type {
  School,
  PaginatedSchools,
  ListSchoolsParams,
  CreateSchoolBody,
  UpdateSchoolBody,
} from './types';

export const listSchools = async (params: ListSchoolsParams): Promise<PaginatedSchools> => {
  const response = await httpClient.get<PaginatedSchools>('/schools', { params });
  return response.data;
};

export const getSchool = async (id: string): Promise<School> => {
  const response = await httpClient.get<School>(`/schools/${id}`);
  return response.data;
};

export const createSchool = async (body: CreateSchoolBody): Promise<School> => {
  const response = await httpClient.post<School>('/schools', body);
  return response.data;
};

export const updateSchool = async (
  id: string, 
  body: UpdateSchoolBody
): Promise<School> => {
  const response = await httpClient.patch<School>(`/schools/${id}`, body);
  return response.data;
};

export const deleteSchool = async (id: string): Promise<void> => {
  await httpClient.delete(`/schools/${id}`);
};