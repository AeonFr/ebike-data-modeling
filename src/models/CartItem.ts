import BaseModel from "./BaseModel";
import Cart from "./Cart";
import Product from "./Product";
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
   * Get the cart this item belongs to
   */
  cart(): Cart | null {
    return Cart.findById(this.cart_id);
  }

  /**
   * Get the product associated with this cart item
   */
  product(): Product | null {
    return Product.findById(this.product_id);
  }

  /**
   * Get all product parts associated with this cart item
   */
  productParts(): CartItemProductPart[] {
    return CartItemProductPart.findBy('cart_item_id', this.id);
  }

  /**
   * Calculate the total price for this cart item
   */
  getTotalPrice(): number {
    return this.unit_price * this.quantity;
  }
}
