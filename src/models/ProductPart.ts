import BaseModel from "./BaseModel";
import ProductPartCategory, { ProductPartCategoryDTO } from "./ProductPartCategory";
import ProductPartCompatibility, { ProductPartCompatibilityDTO } from "./ProductPartCompatibility";

export interface ProductPartDTO {
  id: string;
  category_id: string;
  name: string;
  base_price: number;
  is_in_stock: boolean;
  product_part_category?: ProductPartCategoryDTO;
  compatibilities?: ProductPartCompatibilityDTO[];
}

export default class ProductPart extends BaseModel {
  readonly id: string;
  readonly category_id: string;
  readonly name: string;
  readonly base_price: number;
  readonly is_in_stock: boolean;

  constructor(productPartDto: ProductPartDTO) {
    super();
    this.id = productPartDto.id;
    this.category_id = productPartDto.category_id;
    this.name = productPartDto.name;
    this.base_price = productPartDto.base_price;
    this.is_in_stock = productPartDto.is_in_stock;
  }

  // Serializes so that it can be sent through an API to the web client
  toDto(): ProductPartDTO {
    return {
      id: this.id,
      category_id: this.category_id,
      name: this.name,
      base_price: this.base_price,
      is_in_stock: this.is_in_stock,
      product_part_category: this.productPartCategory()?.toDto(),
      compatibilities: this.getCompatibilities().map(c => c.toDto()),
    };
  }

  /**
   * Get the product part category this part belongs to
   */
  productPartCategory(): ProductPartCategory | null {
    return ProductPartCategory.findById(this.category_id);
  }

  /**
   * Get all compatibility relationships for this product part
   */
  getCompatibilities(): ProductPartCompatibility[] {
    const asFirstPart = ProductPartCompatibility.findBy('product_part_id_1', this.id);
    const asSecondPart = ProductPartCompatibility.findBy('product_part_id_2', this.id);
    return [...asFirstPart, ...asSecondPart];
  }
}
