import type School from '../models/school';

export interface SchoolRepository {
  listSchools(page: number, limit: number): Promise<School[]>;
  countSchools(): Promise<number>;
  getSchool(id: string): Promise<School | undefined>;
  addSchool(school: School): Promise<void>;
  findSchoolByTitle(title: string): Promise<School | undefined>;
  updateSchool(school: School): Promise<void>;
  deleteSchool(id: string): Promise<boolean>;
}