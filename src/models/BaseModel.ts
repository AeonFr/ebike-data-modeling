type Constructor<T> = { new(...args: any): T }

export default class BaseModel {
  static getAll<T>(this: Constructor<T>): T[] {
    return [] // dummy impl
  }

  static findById<T>(this: Constructor<T>, id: string): T | null {
    return null; // dummy impl
  }

  static findBy<T>(this: Constructor<T>, field: string, value: any): T[] {
    // const results = db.query("SELECT * FROM ? WHERE ?=?", this.table, field, value);
    // return results.map(result => new this(result));
    return []; // dummy impl
  }

  toDto(opts: { includeRelationships?: boolean } = {}): unknown {
    throw new Error(`toDto() method should be implemented by the class that inherits BaseModel`);
  }
}
