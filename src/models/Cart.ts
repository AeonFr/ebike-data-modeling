import BaseModel from "./BaseModel";
import CartItem from "./CartItem";

export interface CartDB {
  id: string;
  user_id: string;
  created_at: string;
}

export default class Cart extends BaseModel {
  readonly id: string;
  readonly user_id: string;
  readonly created_at: string;

  static readonly table = "cart";

  constructor(cartDB: CartDB) {
    super();
    this.id = cartDB.id;
    this.user_id = cartDB.user_id;
    this.created_at = cartDB.created_at;
  }

  /**
   * Get all cart items associated with this cart
   */
  cartItems(): CartItem[] {
    return CartItem.getBy('cart_id', this.id);
  }
}
