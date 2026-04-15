import { z } from 'zod';


export const ListSchoolsQuerySchema = z.object({
  page: z.coerce.number({error: "Page must be a number"}).int().positive(),
  limit: z
  .coerce.number({error: "Limit must be a number"}).int().positive()
  .max(200, {error: "Limit must be at most 200"}) // extract to config?
});

export const CreateSchoolBodySchema = z.object({
  title: z
  .string({error: "Title must be a string"}).trim()
  .min(1, {error: "Title must be at least 1 character"})
  .max(512, {error: "Title must be at most 512 characters"}), // extract to config?
  address: z.string({error: "Address must be a string"}),
  contactEmail: z
  .string({error: "Contact email must be a string"})
  .email({error: "Contact email must be a valid email"}),
  contactPhone: z.string({error: "Contact phone must be a string"}),
  note: z.string({error: "Note must be a string"}),
});

export const UpdateSchoolBodySchema = z.object({
  title: z
  .string({error: "Title must be a string"}).trim()
  .min(1, {error: "Title must be at least 1 character"})
  .max(512, {error: "Title must be at most 512 characters"}) // extract to config?
  .optional(),
  completed: z
  .boolean()
  .optional(),
  address: z
  .string({error: "Address must be a string"})
  .optional(),
  contactEmail: z
  .string({error: "Contact email must be a string"})
  .email({error: "Contact email must be a valid email"})
  .optional(),
  contactPhone: z
  .string({error: "Contact phone must be a string"})
  .optional(),
  note: z
  .string({error: "Note must be a string"})
  .optional(),
});

export const IdParamSchema = z.object({
  id: z.uuid({error: "ID parameter must be a valid UUID string"})
});

export type ListSchoolsQuery = z.infer<typeof ListSchoolsQuerySchema>;
export type CreateSchoolBody = z.infer<typeof CreateSchoolBodySchema>;
export type UpdateSchoolBody = z.infer<typeof UpdateSchoolBodySchema>;
export type IdParam = z.infer<typeof IdParamSchema>;