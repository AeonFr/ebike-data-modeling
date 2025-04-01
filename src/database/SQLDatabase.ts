import Database from "./Database";

export default class SQLDatabase implements Database {
  getAll<T>(table: string): T[] {
    return [] // dummy impl
  }

  getBy<T>(table: string, field: string, value: any): T[] {
    // const results = db.query("SELECT * FROM ? WHERE ?=?", this.table, field, value);
    // return results.map(result => new this(result));
    return []; // dummy impl
  }

  findById<T>(table: string, id: string): T | null {
    // const results = db.query("SELECT * FROM ? WHERE id=?", this.table, value);
    // return results.map(result => new this(result));
    return null; // dummy impl
  }
}
