import Database from "./Database";

export default class InMemoryDatabase implements Database {
  data: any;

  constructor(data: any) {
    this.data = data;
  }


  getAll<T>(): T[] {
    return this.data;
  }

  getBy<T>(_: string, field: string, value: any): T[] {
    return this.data.filter((row: any) => {
      return row[field] === value;
    })
  }

  findById<T>(_: string, id: string): T | null {
    return this.data.filter((row: any) => {
      return row.id === id;
    })?.[0] || null;
  }
}
