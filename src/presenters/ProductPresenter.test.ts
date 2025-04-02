import { describe, it, beforeEach, expect } from 'vitest';
import { setGlobalContext } from '../context/Context';
import InMemoryDatabase from '../database/InMemoryDatabase';
import ProductPresenter from './ProductPresenter';
import Product from '../models/Product';


describe('ProductPresenter', () => {
  const data = {
    'products': [],
    'product_part_categories': [],
    'product_parts': [],
    'product_part_compatibilities': [],
    'product_part_pricing_rules': [],
  };

  beforeEach(() => {
    setGlobalContext({
      database: new InMemoryDatabase(data),
    })
  })

  describe('toDTO', () => {
    it('returns the product, with all its relationships, formatted as a DTO (Data Transfer Object)', () => {
      const product = Product.findById('1');
      const productPresenter = new ProductPresenter(product!);

      expect(productPresenter.toDTO()).toEqual({
        // TODO
      })
    })
  })
})

