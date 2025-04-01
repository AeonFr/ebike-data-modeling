import { describe, it, beforeEach, expect } from 'vitest';
import BaseModel from './BaseModel';
import { setGlobalContext } from '../context/Context';
import InMemoryDatabase from '../database/InMemoryDatabase';


describe('BaseModel', () => {
  class BaseModelWithTable extends BaseModel {
    static readonly table = "table";

    constructor() {
      super();
    }
  }

  const tableData = [
    { id: '1', name: 'foo' },
    { id: '2', name: 'bar' }
  ];


  beforeEach(() => {
    setGlobalContext({
      database: new InMemoryDatabase({
        "table": tableData
      }),
    })
  })

  describe('getAll', () => {
    it('returns all results', () => {
      expect(BaseModelWithTable.getAll()).toEqual(tableData);
    })
  })

})

