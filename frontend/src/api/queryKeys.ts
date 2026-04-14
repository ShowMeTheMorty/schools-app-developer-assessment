export const schoolKeys = {
  all: ['schools'] as const,
  list: (page: number, limit: number) => ['schools', 'list', page, limit] as const,
  detail: (id: string) => ['schools', 'detail', id] as const,
};