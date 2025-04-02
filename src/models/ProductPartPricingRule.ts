import BaseModel from "./BaseModel";

export interface ProductPartPricingRuleDB {
  id: string;
  description: string;
  product_part_id_1: string;
  product_part_id_2: string;
  price_adjustment: number;
}

export default class ProductPartPricingRule extends BaseModel {
  readonly id: string;
  readonly description: string;
  readonly product_part_id_1: string;
  readonly product_part_id_2: string;
  readonly price_adjustment: number;

  static readonly table = "product_part_pricing_rules";

  constructor(pricingRuleDB: ProductPartPricingRuleDB) {
    super();
    this.id = pricingRuleDB.id;
    this.description = pricingRuleDB.description;
    this.product_part_id_1 = pricingRuleDB.product_part_id_1;
    this.product_part_id_2 = pricingRuleDB.product_part_id_2;
    this.price_adjustment = pricingRuleDB.price_adjustment;
  }
}
