import BaseModel from "./BaseModel";

export interface ProductPartCategoryDTO {
  id: string;
  product_id: string;
  name: string;
}

export default class ProductPartCategory extends BaseModel {
  readonly id: string;
  readonly product_id: string;
  readonly name: string;

  constructor(productPartCategoryDto: ProductPartCategoryDTO) {
    super();
    this.id = productPartCategoryDto.id;
    this.product_id = productPartCategoryDto.product_id;
    this.name = productPartCategoryDto.name;
  }

  // Serializes so that it can be sent through an API to the web client
  toDto(): ProductPartCategoryDTO {
    return {
      id: this.id,
      product_id: this.product_id,
      name: this.name,
    };
  }
}
