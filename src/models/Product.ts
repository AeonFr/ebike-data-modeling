import BaseModel from "./BaseModel";
import ProductPartCategory from "./ProductPartCategory";

export interface ProductDB {
  id: string;
  name: string;
  base_price: number;
  description: string;
}

export default class Product extends BaseModel {
  readonly id: string;
  readonly name: string;
  readonly base_price: number;
  readonly description: string;

  static readonly table = "products";

  constructor(productDB: ProductDB) {
    super();
    this.id = productDB.id;
    this.name = productDB.name;
    this.base_price = productDB.base_price;
    this.description = productDB.description;
  }

  /**
   * Get all product part categories associated with this product
   */
  productPartCategories(): ProductPartCategory[] {
    return ProductPartCategory.findBy('product_id', this.id);
  }
}
