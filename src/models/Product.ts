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

  constructor(productDto: ProductDTO) {
    super();
    this.id = productDto.id;
    this.name = productDto.name;
    this.base_price = productDto.base_price;
    this.description = productDto.description;
  }

  // Serializes so that it can be sent through an API to the web client
  toDto(opts: { includeRelationshipts?: boolean } = {}): ProductDTO {
    return {
      id: this.id,
      name: this.name,
      base_price: this.base_price,
      description: this.description,
      // TODO avoid N+1 queries (use a proper ORM maybe)
      product_part_categories: opts.includeRelationshipts
        ? this.productPartCategories().map(cat => cat.toDto())
        : undefined,
    };
  }

  /**
   * Get all product part categories associated with this product
   */
  productPartCategories(): ProductPartCategory[] {
    return ProductPartCategory.findBy('product_id', this.id);
  }

}
