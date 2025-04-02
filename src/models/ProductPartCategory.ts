import BaseModel from "./BaseModel";
import ProductPart, { ProductPartDB } from "./ProductPart";

export interface ProductPartCategoryDB {
  id: string;
  product_id: string;
  name: string;
}

export default class ProductPartCategory extends BaseModel {
  readonly id: string;
  readonly product_id: string;
  readonly name: string;

  static readonly table = "product_part_categories";

  constructor(productPartCategoryDB: ProductPartCategoryDB) {
    super();
    this.id = productPartCategoryDB.id;
    this.product_id = productPartCategoryDB.product_id;
    this.name = productPartCategoryDB.name;
  }

  /**
   * Get all product parts associated with this category
   */
  productParts(): ProductPart[] {
    return ProductPart.findBy('category_id', this.id);
  }
}
