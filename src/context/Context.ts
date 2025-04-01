import Database from "../database/Database"

export interface Context {
  database: Database;
}

let globalContext: Context;

export function getGlobalContext(): Context {
  if (!globalContext) {
    throw new Error(`Global Context not set! Define one with setGlobalContext()`);
  }

  return globalContext;
}

export function setGlobalContext(context: Context) {
  globalContext = context;
}
