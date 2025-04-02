import { getGlobalContext } from "../context/Context";

type Constructor<T> = {
  new(...args: any): T;
  table: string;
}

export default class BaseModel {
  static readonly table: string;

  static getAll<T>(this: Constructor<T>): T[] {
    return getGlobalContext().database.getAll(this.table).map(row => new this(row));
  }

  static getBy<T>(this: Constructor<T>, field: string, value: any): T[] {
    return getGlobalContext().database.getBy<T>(this.table, field, value).map(row => new this(row));
  }

  static findById<T>(this: Constructor<T>, id: string): T | null {
    const result = getGlobalContext().database.findById<T>(this.table, id);

    if (result) {
      return new this(result);
    }

    return null;
  }

}
