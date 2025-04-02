import { describe, it, beforeEach, expect } from 'vitest';
import { setGlobalContext } from '../context/Context';
import InMemoryDatabase from '../database/InMemoryDatabase';
import ProductPresenter from './ProductPresenter';
import Product from '../models/Product';


describe('ProductPresenter', () => {
  const data = {
    'products': [
      {
        id: '1',
        name: 'Custom Mountain Bike',
        base_price: 299.99,
        description: 'Build your own custom mountain bike with premium components'
      }
    ],
    'product_part_categories': [
      {
        id: '1',
        product_id: '1',
        name: 'Frame Type'
      },
      {
        id: '2',
        product_id: '1',
        name: 'Frame Finish'
      },
      {
        id: '3',
        product_id: '1',
        name: 'Wheels'
      },
      {
        id: '4',
        product_id: '1',
        name: 'Rim Color'
      },
      {
        id: '5',
        product_id: '1',
        name: 'Chain'
      }
    ],
    'product_parts': [
      // Frame Types
      {
        id: '101',
        category_id: '1',
        name: 'Full-suspension',
        base_price: 130.00,
        is_in_stock: true
      },
      {
        id: '102',
        category_id: '1',
        name: 'Diamond',
        base_price: 100.00,
        is_in_stock: true
      },
      {
        id: '103',
        category_id: '1',
        name: 'Step-through',
        base_price: 110.00,
        is_in_stock: false
      },
      // Frame Finish
      {
        id: '201',
        category_id: '2',
        name: 'Matte',
        base_price: 25.00,
        is_in_stock: true
      },
      {
        id: '202',
        category_id: '2',
        name: 'Shiny',
        base_price: 30.00,
        is_in_stock: true
      },
      // Wheels
      {
        id: '301',
        category_id: '3',
        name: 'Road wheels',
        base_price: 80.00,
        is_in_stock: true
      },
      {
        id: '302',
        category_id: '3',
        name: 'Mountain wheels',
        base_price: 95.00,
        is_in_stock: true
      },
      {
        id: '303',
        category_id: '3',
        name: 'Fat bike wheels',
        base_price: 120.00,
        is_in_stock: true
      },
      // Rim Colors
      {
        id: '401',
        category_id: '4',
        name: 'Red',
        base_price: 15.00,
        is_in_stock: true
      },
      {
        id: '402',
        category_id: '4',
        name: 'Black',
        base_price: 10.00,
        is_in_stock: true
      },
      {
        id: '403',
        category_id: '4',
        name: 'Blue',
        base_price: 20.00,
        is_in_stock: true
      },
      // Chains
      {
        id: '501',
        category_id: '5',
        name: 'Single-speed chain',
        base_price: 43.00,
        is_in_stock: true
      },
      {
        id: '502',
        category_id: '5',
        name: '8-speed chain',
        base_price: 55.00,
        is_in_stock: true
      }
    ],
    'product_part_compatibilities': [
      // Mountain wheels only compatible with full-suspension frame
      {
        id: '1001',
        product_part_id_1: '302', // Mountain wheels
        product_part_id_2: '102', // Diamond frame
        is_compatible: false
      },
      {
        id: '1002',
        product_part_id_1: '302', // Mountain wheels
        product_part_id_2: '103', // Step-through frame
        is_compatible: false
      },
      // Fat bike wheels - red rim color not available
      {
        id: '1003',
        product_part_id_1: '303', // Fat bike wheels
        product_part_id_2: '401', // Red rim
        is_compatible: false
      }
    ],
    'product_part_pricing_rules': [
      // Matte finish costs more on full-suspension frame
      {
        id: '2001',
        description: 'Matte finish on full-suspension frame',
        product_part_id_1: '201', // Matte finish
        product_part_id_2: '101', // Full-suspension
        price_adjustment: 25.00 // Additional cost
      },
      // Matte finish costs more on diamond frame but less than full-suspension
      {
        id: '2002',
        description: 'Matte finish on diamond frame',
        product_part_id_1: '201', // Matte finish
        product_part_id_2: '102', // Diamond frame
        price_adjustment: 10.00 // Additional cost
      }
    ]
  };

  beforeEach(() => {
    setGlobalContext({
      database: new InMemoryDatabase(data),
    })
  })

  describe('toDTO', () => {
    it('returns the product, with all its relationships, formatted as a DTO (Data Transfer Object)', () => {
      const product = Product.findById('1');

      if (!product) {
        throw new Error(`Product not found`);
      }

      const productPresenter = new ProductPresenter(product);

      expect(productPresenter.toDTO()).toEqual({
        id: '1',
        name: 'Custom Mountain Bike',
        basePrice: 299.99,
        description: 'Build your own custom mountain bike with premium components',
        partCategories: [
          {
            id: '1',
            name: 'Frame Type',
            productParts: [
              {
                id: '101',
                name: 'Full-suspension',
                basePrice: 130.00,
                isInStock: true,
                incompatiblePartsIds: [],
                pricingRules: [
                  {
                    partId: '201',
                    priceAdjustment: 25.00
                  }
                ]
              },
              {
                id: '102',
                name: 'Diamond',
                basePrice: 100.00,
                isInStock: true,
                incompatiblePartsIds: ['302'],
                pricingRules: [
                  {
                    partId: '201',
                    priceAdjustment: 10.00
                  }
                ]
              },
              {
                id: '103',
                name: 'Step-through',
                basePrice: 110.00,
                isInStock: false,
                incompatiblePartsIds: ['302'],
                pricingRules: []
              }
            ]
          },
          {
            id: '2',
            name: 'Frame Finish',
            productParts: [
              {
                id: '201',
                name: 'Matte',
                basePrice: 25.00,
                isInStock: true,
                incompatiblePartsIds: [],
                pricingRules: [
                  {
                    partId: '101',
                    priceAdjustment: 25.00
                  },
                  {
                    partId: '102',
                    priceAdjustment: 10.00
                  }
                ]
              },
              {
                id: '202',
                name: 'Shiny',
                basePrice: 30.00,
                isInStock: true,
                incompatiblePartsIds: [],
                pricingRules: []
              }
            ]
          },
          {
            id: '3',
            name: 'Wheels',
            productParts: [
              {
                id: '301',
                name: 'Road wheels',
                basePrice: 80.00,
                isInStock: true,
                incompatiblePartsIds: [],
                pricingRules: []
              },
              {
                id: '302',
                name: 'Mountain wheels',
                basePrice: 95.00,
                isInStock: true,
                incompatiblePartsIds: ['102', '103'],
                pricingRules: []
              },
              {
                id: '303',
                name: 'Fat bike wheels',
                basePrice: 120.00,
                isInStock: true,
                incompatiblePartsIds: ['401'],
                pricingRules: []
              }
            ]
          },
          {
            id: '4',
            name: 'Rim Color',
            productParts: [
              {
                id: '401',
                name: 'Red',
                basePrice: 15.00,
                isInStock: true,
                incompatiblePartsIds: ['303'],
                pricingRules: []
              },
              {
                id: '402',
                name: 'Black',
                basePrice: 10.00,
                isInStock: true,
                incompatiblePartsIds: [],
                pricingRules: []
              },
              {
                id: '403',
                name: 'Blue',
                basePrice: 20.00,
                isInStock: true,
                incompatiblePartsIds: [],
                pricingRules: []
              }
            ]
          },
          {
            id: '5',
            name: 'Chain',
            productParts: [
              {
                id: '501',
                name: 'Single-speed chain',
                basePrice: 43.00,
                isInStock: true,
                incompatiblePartsIds: [],
                pricingRules: []
              },
              {
                id: '502',
                name: '8-speed chain',
                basePrice: 55.00,
                isInStock: true,
                incompatiblePartsIds: [],
                pricingRules: []
              }
            ]
          }
        ]
      })
    })
  })
})

