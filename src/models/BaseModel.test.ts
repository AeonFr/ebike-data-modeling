import { describe, it, beforeEach, expect } from 'vitest';
import BaseModel from './BaseModel';
import { setGlobalContext } from '../context/Context';
import InMemoryDatabase from '../database/InMemoryDatabase';


describe('BaseModel', () => {
  class Row extends BaseModel {
    static readonly table = "table";

    id: string;
    name: string;

    constructor(row: { id: string; name: string }) {
      super();

      this.id = row.id;
      this.name = row.name
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
      expect(Row.getAll()).toEqual(
        tableData.map(row => new Row(row))
      );
    })
  })

  describe('findById', () => {
    it('returns the item with matching id', () => {
      expect(Row.findById('1')).toEqual(new Row(tableData[0]));
      expect(Row.findById('2')).toEqual(new Row(tableData[1]));
      expect(Row.findById('3')).toBeNull();
    });
  });

  describe('getBy', () => {
    it('returns items with matching field value', () => {
      expect(Row.getBy('name', 'foo')).toEqual([new Row(tableData[0])]);
      expect(Row.getBy('name', 'bar')).toEqual([new Row(tableData[1])]);
      expect(Row.getBy('name', 'baz')).toEqual([]);
      expect(Row.getBy('id', '1')).toEqual([new Row(tableData[0])]);
    });
  });
})

