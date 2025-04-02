import BaseModel from "./BaseModel";

export interface CartItemProductPartDB {
  id: string;
  cart_item_id: string;
  product_part_id: string;
}

export default class CartItemProductPart extends BaseModel {
  readonly id: string;
  readonly cart_item_id: string;
  readonly product_part_id: string;

  static readonly table = "cart_item_product_part";

  constructor(cartItemProductPartDB: CartItemProductPartDB) {
    super();
    this.id = cartItemProductPartDB.id;
    this.cart_item_id = cartItemProductPartDB.cart_item_id;
    this.product_part_id = cartItemProductPartDB.product_part_id;
  }

  /**
   * Placeholder method, TODO implement
   */
  static create(cartItemProductPart: Omit<CartItemProductPartDB, "id">) {
    const id = new Date().toISOString();
    return new this({
      id,
      ...cartItemProductPart
    });
  }
}
