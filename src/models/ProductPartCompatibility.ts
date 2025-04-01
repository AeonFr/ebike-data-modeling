import BaseModel from "./BaseModel";
import ProductPart from "./ProductPart";

export interface ProductPartCompatibilityDTO {
  id: string;
  product_part_id_1: string;
  product_part_id_2: string;
  is_compatible: boolean;
}

export default class ProductPartCompatibility extends BaseModel {
  readonly id: string;
  readonly product_part_id_1: string;
  readonly product_part_id_2: string;
  readonly is_compatible: boolean;

  constructor(compatibilityDto: ProductPartCompatibilityDTO) {
    super();
    this.id = compatibilityDto.id;
    this.product_part_id_1 = compatibilityDto.product_part_id_1;
    this.product_part_id_2 = compatibilityDto.product_part_id_2;
    this.is_compatible = compatibilityDto.is_compatible;
  }

  // Serializes so that it can be sent through an API to the web client
  toDto(): ProductPartCompatibilityDTO {
    return {
      id: this.id,
      product_part_id_1: this.product_part_id_1,
      product_part_id_2: this.product_part_id_2,
      is_compatible: this.is_compatible
    };
  }

  /**
   * Get the first product part in this compatibility relationship
   */
  productPart1(): ProductPart | null {
    return ProductPart.findById(this.product_part_id_1);
  }

  /**
   * Get the second product part in this compatibility relationship
   */
  productPart2(): ProductPart | null {
    return ProductPart.findById(this.product_part_id_2);
  }
}
