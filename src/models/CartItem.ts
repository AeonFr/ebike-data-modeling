import BaseModel from "./BaseModel";
import CartItemProductPart from "./CartItemProductPart";

export interface CartItemDB {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  created_at: string;
}

export default class CartItem extends BaseModel {
  readonly id: string;
  readonly cart_id: string;
  readonly product_id: string;
  readonly quantity: number;
  readonly unit_price: number;
  readonly created_at: string;

  static readonly table = "cart_item";

  constructor(cartItemDB: CartItemDB) {
    super();
    this.id = cartItemDB.id;
    this.cart_id = cartItemDB.cart_id;
    this.product_id = cartItemDB.product_id;
    this.quantity = cartItemDB.quantity;
    this.unit_price = cartItemDB.unit_price;
    this.created_at = cartItemDB.created_at;
  }

  /**
   * Get all product parts associated with this cart item
   */
  productParts(): CartItemProductPart[] {
    return CartItemProductPart.getBy('cart_item_id', this.id);
  }

  /**
   * Placeholder method, TODO implement
   */
  static create(cartItem: Omit<CartItemDB, "id">) {
    const id = new Date().toISOString();
    return new this({
      id,
      ...cartItem
    });
  }
}
