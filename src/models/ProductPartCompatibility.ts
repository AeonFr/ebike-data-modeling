import BaseModel from "./BaseModel";

export interface ProductPartCompatibilityDB {
  id: string;
  product_part_id_1: string;
  product_part_id_2: string;
  is_compatible: boolean;
}

export default class ProductPartCompatibility extends BaseModel {
  readonly id: string;
  readonly product_part_id_1: string;
  readonly product_part_id_2: string;
  readonly is_compatible: boolean;

  static readonly table = "product_part_compatibilities";

  constructor(compatibilityDB: ProductPartCompatibilityDB) {
    super();
    this.id = compatibilityDB.id;
    this.product_part_id_1 = compatibilityDB.product_part_id_1;
    this.product_part_id_2 = compatibilityDB.product_part_id_2;
    this.is_compatible = compatibilityDB.is_compatible;
  }
}
