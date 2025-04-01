import Database from "./Database";

export default class InMemoryDatabase implements Database {
  data: any;

  constructor(data: any) {
    this.data = data;
  }


  getAll<T>(table: string): T[] {
    return this.data[table];
  }

  getBy<T>(table: string, field: string, value: any): T[] {
    return this.data[table].filter((row: any) => {
      return row[field] === value;
    })
  }

  findById<T>(table: string, id: string): T | null {
    return this.data[table].filter((row: any) => {
      return row.id === id;
    })?.[0] || null;
  }
}
