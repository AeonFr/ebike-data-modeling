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
  product_part_category?: ProductPartCategoryDTO;
  compatibilities?: ProductPartCompatibilityDTO[];
  pricing_rules?: ProductPartPricingRuleDTO[];
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
      pricing_rules: this.getPricingRules().map(rule => rule.toDto()),
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

  /**
   * Get all pricing rules where this part is the base part
   */
  getPricingRules(): ProductPartPricingRule[] {
    return ProductPartPricingRule.findBy('product_part_id_base', this.id);
  }

  /**
   * Get all pricing rules where this part is the dependent part
   */
  getDependentPricingRules(): ProductPartPricingRule[] {
    return ProductPartPricingRule.findBy('product_part_id_dep', this.id);
  }

  /**
   * Calculate the price adjustment when this part is combined with another part
   * @param otherPartId The ID of the other part to check pricing rules with
   * @returns The price adjustment amount or 0 if no rule exists
   */
  getPriceAdjustmentWith(otherPartId: string): number {
    // Check rules where this part is the base
    const baseRules = this.getPricingRules();
    for (const rule of baseRules) {
      if (rule.product_part_id_dep === otherPartId) {
        return rule.price_adjustment;
      }
    }

    // Check rules where this part is the dependent
    const depRules = this.getDependentPricingRules();
    for (const rule of depRules) {
      if (rule.product_part_id_base === otherPartId) {
        return rule.price_adjustment;
      }
    }

    return 0; // No pricing rule found
  }
}
