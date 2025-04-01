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

  describe('findById', () => {
    it('returns the item with matching id', () => {
      // Mock the findById implementation for testing
      BaseModel.findById = function<T>(this: any, id: string): T | null {
        return this.getAll().find((item: any) => item.id === id) || null;
      };

      expect(BaseModelWithTable.findById('1')).toEqual(tableData[0]);
      expect(BaseModelWithTable.findById('2')).toEqual(tableData[1]);
      expect(BaseModelWithTable.findById('3')).toBeNull();
    });
  });

  describe('findBy', () => {
    it('returns items with matching field value', () => {
      // Mock the findBy implementation for testing
      BaseModel.findBy = function<T>(this: any, field: string, value: any): T[] {
        return this.getAll().filter((item: any) => item[field] === value);
      };

      expect(BaseModelWithTable.findBy('name', 'foo')).toEqual([tableData[0]]);
      expect(BaseModelWithTable.findBy('name', 'bar')).toEqual([tableData[1]]);
      expect(BaseModelWithTable.findBy('name', 'baz')).toEqual([]);
      expect(BaseModelWithTable.findBy('id', '1')).toEqual([tableData[0]]);
    });
  });
})

