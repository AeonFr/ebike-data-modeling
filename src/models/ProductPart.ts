import BaseModel from "./BaseModel";
import ProductPartCompatibility from "./ProductPartCompatibility";
import ProductPartPricingRule from "./ProductPartPricingRule";

export interface ProductPartDB {
  id: string;
  category_id: string;
  name: string;
  base_price: number;
  is_in_stock: boolean;
}

export default class ProductPart extends BaseModel {
  readonly id: string;
  readonly category_id: string;
  readonly name: string;
  readonly base_price: number;
  readonly is_in_stock: boolean;

  static readonly table = "product_parts";

  constructor(productPartDB: ProductPartDB) {
    super();
    this.id = productPartDB.id;
    this.category_id = productPartDB.category_id;
    this.name = productPartDB.name;
    this.base_price = productPartDB.base_price;
    this.is_in_stock = productPartDB.is_in_stock;
  }

  /**
   * Get all compatibility relationships for this product part
   */
  getCompatibilities(): ProductPartCompatibility[] {
    const asFirstPart = ProductPartCompatibility.getBy('product_part_id_1', this.id);
    const asSecondPart = ProductPartCompatibility.getBy('product_part_id_2', this.id);
    return [...asFirstPart, ...asSecondPart];
  }

  /**
   * Get all pricing rules relationships for this product part
   */
  getPricingRules(): ProductPartPricingRule[] {
    const asFirstPart = ProductPartPricingRule.getBy('product_part_id_1', this.id);
    const asSecondPart = ProductPartPricingRule.getBy('product_part_id_2', this.id);

    return [...asFirstPart, ...asSecondPart];
  }
}
