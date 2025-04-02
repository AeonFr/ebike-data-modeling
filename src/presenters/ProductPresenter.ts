import Product from "../models/Product";
import ProductPart from "../models/ProductPart";

interface ProductDTO {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  partCategories: ProductPartCategoryDTO[];
}

interface ProductPartCategoryDTO {
  id: string;
  name: string;
  productParts: ProductPartDTO[];
}

interface ProductPartDTO {
  id: string;
  name: string;
  basePrice: number;
  isInStock: boolean;

  incompatiblePartsIds: string[];
  pricingRules: ProductPartPricingRuleDTO[];
}

interface ProductPartPricingRuleDTO {
  partId: string;
  priceAdjustment: number;
}

export default class ProductPresenter {
  private product: Product;

  constructor(product: Product) {
    this.product = product;
  }

  toDTO(): ProductDTO {
    const product = this.product;
    return {
      id: product.id,
      name: product.name,
      basePrice: product.base_price,
      description: product.description,
      partCategories: product.productPartCategories().map(partCategory => ({
        id: partCategory.id,
        name: partCategory.name,
        // TODO prevent N+1 query
        productParts: partCategory.productParts().map(productPart => ({
          id: productPart.id,
          name: productPart.name,
          basePrice: productPart.base_price,
          isInStock: productPart.is_in_stock,
          incompatiblePartsIds: this.getIncompatiblePartsIds(productPart),
          pricingRules: this.getPricingRules(productPart),
        }))
      })),
    }
  }

  getIncompatiblePartsIds(productPart: ProductPart) {
    const productPartCompatibilities = productPart.getCompatibilities();

    return productPartCompatibilities
      // only select incompatible parts
      .filter(partCompatibility => !partCompatibility.is_compatible)
      // reference the ID of the *other* product to get incompatible products
      .map(partCompatibility => (
        partCompatibility.product_part_id_2 === productPart.id ?
          partCompatibility.product_part_id_2
          : partCompatibility.product_part_id_1
      ));
  }

  getPricingRules(productPart: ProductPart) {
    const productPartPricingRules = productPart.getPricingRules();

    return productPartPricingRules
      .map(pricingRule => ({
        partId: pricingRule.product_part_id_2 === productPart.id ?
          pricingRule.product_part_id_2
          : pricingRule.product_part_id_1,
        priceAdjustment: pricingRule.price_adjustment,
      }));
  }
}
