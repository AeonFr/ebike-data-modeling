import BaseModel from "./BaseModel";
import CartItem from "./CartItem";
import CartItemProductPart from "./CartItemProductPart";
import Product from "./Product";
import ProductPart from "./ProductPart";

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

  /**
   * Add a cart item to the cart
   * - Creates one CartItem and as much CartItemProductParts as product parts are provided
   * - Calculates the price of the given combination
   * - Fails if an incompatible combination of product parts is supplied
   *
   *   TODO: implement "save" logic
   */
  addCartItem(productId: string, productParts: ProductPart[], quantity = 1) {
    this.validateProductPartsAreCompatible(productParts);
    const totalPrice = this.calculateCartItemPrice(productParts);

    // TODO start DB transaction

    const cartItem = CartItem.create({
      product_id: productId,
      cart_id: this.id,
      unit_price: totalPrice,
      quantity,
      created_at: new Date().toISOString(),
    });

    productParts.forEach((productPart) => {
      CartItemProductPart.create({
        cart_item_id: cartItem.id,
        product_part_id: productPart.id,
      });
    });

    // TODO end db transaction
  }

  private validateProductPartsAreCompatible(productParts: ProductPart[]) {
    // TODO 
    //   1. Grab all product parts incompatibilities (using select * where id in (...ids) to prevent N+1 query)
    //   2. Map productParts to an array of IDs called `productPartIds`
    //   3. Loop through each id, and for each id, loop through all incompatible product parts and see if the ID appears in one.
    //   4. If the ID appears in an incompatible product part "row", check if the other ID of that row is included in the `productPartIds` array
    //   5. If that's the case, we should throw an error, as two incompatible parts have been found
    //
    // Maybe there's a smart way to optimize it to prevent the nested loop, but I'd start with that implementation and evolve from there
  }

  private calculateCartItemPrice(productParts: ProductPart[]): number {
    let price = 0;

    // TODO
    //   1. Loop through each product part and add its `base_price` to `price`.
    //   2. Check all the "product part pricing rules" where this product part is referenced in the "product_part_id_1" row
    //      (this will be useful to prevent applying the rule twice)
    //   3. For each product part pricing rule, select the "product_part_id_2". Loop through all `productParts` and see if any
    //      product part has that id.
    //   4. If there's a match (in step 3), apply the "product part pricing rule"'s `price_adjustment` to `price`
    //
    // Note: To prevent floating-point math errors, we should perhaps multiply all prices by 100 while making calculations,
    // and divide them by 100 at the end, before returning the price.

    return price;
  }
}
