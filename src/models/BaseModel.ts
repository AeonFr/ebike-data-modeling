import { getGlobalContext } from "../context/Context";

type Constructor<T> = {
  new(...args: any): T;
  table: string;
}

export default class BaseModel {
  static readonly table: string;

  static getAll<T>(this: Constructor<T>): T[] {
    return getGlobalContext().database.getAll(this.table);
  }

  static findById<T>(this: Constructor<T>, id: string): T | null {
    return getGlobalContext().database.findById<T>(this.table, id);
  }

  static findBy<T>(this: Constructor<T>, field: string, value: any): T[] {
    return getGlobalContext().database.getBy<T>(this.table, field, value);
  }

  toDto(opts: { includeRelationships?: boolean } = {}): unknown {
    throw new Error(`toDto() method should be implemented by the class that inherits BaseModel`);
  }
}
