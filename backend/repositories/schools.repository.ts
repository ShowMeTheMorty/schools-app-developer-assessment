import { getDatabase } from '../database/database';
import School from '../models/school';

const listSchools = async (page: number, limit: number): Promise<School[]> => {
  const db = await getDatabase();
  await db.read();
  const start = (page - 1) * limit;
  // lol, efficient, not
  return db.data.schools.slice(start, start + limit);
}

const getSchool = async (id: string): Promise<School | undefined> => {
  const db = await getDatabase();
  await db.read();
  return db.data.schools.find(school => school.id === id);
}

const addSchool = async (school: School): Promise<School> => {
  const db = await getDatabase();
  await db.read();
  db.data.schools.push(school);
  await db.write();
  return school;
}

const updateSchool = async (id: string, updates: Partial<School>): Promise<School | undefined> => {
  const db = await getDatabase();
  await db.read();
  const school = db.data.schools.find(s => s.id === id);
  if (!school) return undefined;
  Object.assign(school, updates);
  await db.write();
  return school;
}

const deleteSchool = async (id: string): Promise<boolean> => {
  const db = await getDatabase();
  await db.read();
  const index = db.data.schools.findIndex(s => s.id === id);
  if (index === -1) return false;
  db.data.schools.splice(index, 1);
  await db.write();
  return true;
}