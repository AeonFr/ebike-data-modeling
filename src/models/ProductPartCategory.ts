import BaseModel from "./BaseModel";
import ProductPart, { ProductPartDTO } from "./ProductPart";

export interface ProductPartCategoryDTO {
  id: string;
  product_id: string;
  name: string;
  product_parts?: ProductPartDTO[];
}

export default class ProductPartCategory extends BaseModel {
  readonly id: string;
  readonly product_id: string;
  readonly name: string;

  static readonly table = "product_part_categories";

  constructor(productPartCategoryDto: ProductPartCategoryDTO) {
    super();
    this.id = productPartCategoryDto.id;
    this.product_id = productPartCategoryDto.product_id;
    this.name = productPartCategoryDto.name;
  }

  /**
   * Get all product parts associated with this category
   */
  productParts(): ProductPart[] {
    return ProductPart.findBy('category_id', this.id);
  }
}
