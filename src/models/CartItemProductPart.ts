import BaseModel from "./BaseModel";
import CartItem from "./CartItem";
import ProductPart from "./ProductPart";

export interface CartItemProductPartDB {
  cart_item_id: string;
  product_part_id: string;
}

export default class CartItemProductPart extends BaseModel {
  readonly cart_item_id: string;
  readonly product_part_id: string;

  static readonly table = "cart_item_product_part";

  constructor(cartItemProductPartDB: CartItemProductPartDB) {
    super();
    this.cart_item_id = cartItemProductPartDB.cart_item_id;
    this.product_part_id = cartItemProductPartDB.product_part_id;
  }

  /**
   * Get the cart item this product part belongs to
   */
  cartItem(): CartItem | null {
    return CartItem.findById(this.cart_item_id);
  }

  /**
   * Get the product part associated with this cart item
   */
  productPart(): ProductPart | null {
    return ProductPart.findById(this.product_part_id);
  }
}
