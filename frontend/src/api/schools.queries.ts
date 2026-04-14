import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  listSchools,
  getSchool,
  createSchool,
  updateSchool,
  deleteSchool,
} from "./schools.api";
import { schoolKeys } from "./queryKeys";
import type {
  School,
  AppApiError,
  ListSchoolsParams,
  CreateSchoolBody,
  UpdateSchoolBody,
} from "./types";


const useListSchoolsQuery = (params: ListSchoolsParams) => {
  return useQuery<School[], AppApiError>({
    queryKey: schoolKeys.list(params.page, params.limit),
    queryFn: () => listSchools(params),
  });
}

const useGetSchoolQuery = (id: string) => {
  return useQuery<School, AppApiError>({
    queryKey: schoolKeys.detail(id),
    queryFn: () => getSchool(id),
  });
}

const useCreateSchoolMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<School, AppApiError, CreateSchoolBody>({
    mutationFn: (body) => createSchool(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schoolKeys.all });
    },
  });
}

const useUpdateSchoolMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<School, AppApiError, { id: string; body: UpdateSchoolBody }>({
    mutationFn: ({ id, body }) => updateSchool(id, body),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: schoolKeys.detail(updated.id) });
      queryClient.invalidateQueries({ queryKey: schoolKeys.all });
    },
  });
};

const useDeleteSchoolMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AppApiError, string>({
    mutationFn: deleteSchool,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schoolKeys.all });
    },
  });
};


export {
  useListSchoolsQuery,
  useGetSchoolQuery,
  useCreateSchoolMutation,
  useUpdateSchoolMutation,
  useDeleteSchoolMutation,
};