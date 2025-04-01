import BaseModel from "./BaseModel";
import ProductPart from "./ProductPart";

export interface ProductPartPricingRuleDTO {
  id: string;
  description: string;
  product_part_id_base: string;
  product_part_id_dep: string;
  price_adjustment: number;
}

export default class ProductPartPricingRule extends BaseModel {
  readonly id: string;
  readonly description: string;
  readonly product_part_id_base: string;
  readonly product_part_id_dep: string;
  readonly price_adjustment: number;

  static readonly table = "product_part_pricing_rules";

  constructor(pricingRuleDto: ProductPartPricingRuleDTO) {
    super();
    this.id = pricingRuleDto.id;
    this.description = pricingRuleDto.description;
    this.product_part_id_base = pricingRuleDto.product_part_id_base;
    this.product_part_id_dep = pricingRuleDto.product_part_id_dep;
    this.price_adjustment = pricingRuleDto.price_adjustment;
  }

  // Serializes so that it can be sent through an API to the web client
  toDto(opts: { includeRelationships?: boolean } = {}): ProductPartPricingRuleDTO {
    return {
      id: this.id,
      description: this.description,
      product_part_id_base: this.product_part_id_base,
      product_part_id_dep: this.product_part_id_dep,
      price_adjustment: this.price_adjustment
    };
  }
}
