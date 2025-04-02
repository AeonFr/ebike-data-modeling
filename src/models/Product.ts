import BaseModel from "./BaseModel";
import ProductPartCategory, { ProductPartCategoryDTO } from "./ProductPartCategory";

export interface ProductDTO {
  id: string;
  name: string;
  base_price: number;
  description: string;
  product_part_categories?: ProductPartCategoryDTO[];
}

export default class Product extends BaseModel {
  readonly id: string;
  readonly name: string;
  readonly base_price: number;
  readonly description: string;

  static readonly table = "products";

  constructor(productDto: ProductDTO) {
    super();
    this.id = productDto.id;
    this.name = productDto.name;
    this.base_price = productDto.base_price;
    this.description = productDto.description;
  }

  /**
   * Get all product part categories associated with this product
   */
  productPartCategories(): ProductPartCategory[] {
    return ProductPartCategory.findBy('product_id', this.id);
  }
}
