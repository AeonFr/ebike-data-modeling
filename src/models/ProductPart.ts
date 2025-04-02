import BaseModel from "./BaseModel";
import ProductPartCategory, { ProductPartCategoryDTO } from "./ProductPartCategory";
import ProductPartCompatibility, { ProductPartCompatibilityDTO } from "./ProductPartCompatibility";
import ProductPartPricingRule, { ProductPartPricingRuleDTO } from "./ProductPartPricingRule";

export interface ProductPartDTO {
  id: string;
  category_id: string;
  name: string;
  base_price: number;
  is_in_stock: boolean;
  compatibilities?: ProductPartCompatibilityDTO[];
  pricing_rules?: ProductPartPricingRuleDTO[];
}

export default class ProductPart extends BaseModel {
  readonly id: string;
  readonly category_id: string;
  readonly name: string;
  readonly base_price: number;
  readonly is_in_stock: boolean;

  static readonly table = "product_parts";

  constructor(productPartDto: ProductPartDTO) {
    super();
    this.id = productPartDto.id;
    this.category_id = productPartDto.category_id;
    this.name = productPartDto.name;
    this.base_price = productPartDto.base_price;
    this.is_in_stock = productPartDto.is_in_stock;
  }

  /**
   * Get all compatibility relationships for this product part
   */
  getCompatibilities(): ProductPartCompatibility[] {
    const asFirstPart = ProductPartCompatibility.findBy('product_part_id_1', this.id);
    const asSecondPart = ProductPartCompatibility.findBy('product_part_id_2', this.id);
    return [...asFirstPart, ...asSecondPart];
  }

  /**
   * Get all pricing rules relationships for this product part
   */
  getPricingRules(): ProductPartPricingRule[] {
    const asFirstPart = ProductPartPricingRule.findBy('product_part_id_base', this.id);
    const asSecondPart = ProductPartPricingRule.findBy('product_part_id_dep', this.id);

    return [...asFirstPart, ...asSecondPart];
  }
}
