import BaseModel from "./BaseModel";
import ProductPartCategory, { ProductPartCategoryDTO } from "./ProductPartCategory";

export interface ProductPartDTO {
  id: string;
  category_id: string;
  name: string;
  base_price: number;
  is_in_stock: boolean;
  product_part_category?: ProductPartCategoryDTO;
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
    };
  }

  /**
   * Get the product part category this part belongs to
   */
  productPartCategory(): ProductPartCategory | null {
    return ProductPartCategory.findById(this.category_id);
  }
}
