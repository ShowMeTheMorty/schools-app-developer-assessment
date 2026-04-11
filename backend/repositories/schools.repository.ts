import { getDatabase } from '../database/database';
import School from '../models/school';

const listSchools = async (page: number, limit: number): Promise<School[]> => {
  const db = await getDatabase();
  await db.read();
  const start = (page - 1) * limit;
  // lol, efficient, not
  return db.data.schools.slice(start, start + limit);
};

const getSchool = async (id: string): Promise<School | undefined> => {
  const db = await getDatabase();
  await db.read();
  return db.data.schools.find(school => school.id === id);
};

const addSchool = async (school: School): Promise<void> => {
  const db = await getDatabase();
  await db.read();
  db.data.schools.push(school);
  await db.write();
};

const findSchoolByTitle = async (title: string): Promise<School | undefined> => {
  const db = await getDatabase();
  await db.read();
  return db.data.schools.find(school => school.title.toLowerCase() === title.toLowerCase());
};

const updateSchool = async (school: School): Promise<void> => {
  const db = await getDatabase();
  await db.read();
  const existingSchool = db.data.schools.find(s => s.id === school.id);
  if (!existingSchool) return;
  Object.assign(existingSchool, school);
  await db.write();
};

const deleteSchool = async (id: string): Promise<boolean> => {
  const db = await getDatabase();
  await db.read();
  const index = db.data.schools.findIndex(s => s.id === id);
  if (index === -1) return false;
  db.data.schools.splice(index, 1);
  await db.write();
  return true;
};

export default {
  listSchools,
  getSchool,
  addSchool,
  findSchoolByTitle,
  updateSchool,
  deleteSchool
};