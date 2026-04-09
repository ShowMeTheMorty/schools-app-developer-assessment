import { JSONFilePreset } from 'lowdb/node';
import School from '../models/school';

type Data = { schools: School[] };

const defaultData: Data = { schools: [] };
let database: Awaited<ReturnType<typeof JSONFilePreset<Data>>>;

export async function getDatabase() {
  if (!database) {
    database = await JSONFilePreset<Data>('database/schools.data.json', defaultData);
  }
  return database;
}