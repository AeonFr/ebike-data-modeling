import BaseModel from "./BaseModel";
import ProductPart from "./ProductPart";

export interface ProductPartPricingRuleDB {
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

  constructor(pricingRuleDB: ProductPartPricingRuleDB) {
    super();
    this.id = pricingRuleDB.id;
    this.description = pricingRuleDB.description;
    this.product_part_id_base = pricingRuleDB.product_part_id_base;
    this.product_part_id_dep = pricingRuleDB.product_part_id_dep;
    this.price_adjustment = pricingRuleDB.price_adjustment;
  }
}
