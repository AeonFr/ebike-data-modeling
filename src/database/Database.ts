export default interface Database {
  getAll<T>(table: string): T[];
  getBy<T>(table: string, field: string, value: any): T[];

  findById<T>(table: string, id: string): T | null;

  // save<T>(entity: T): void;
  // delete<T>(id: string): void;
}
