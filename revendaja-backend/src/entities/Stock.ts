import { Store } from "./Store";
import { Product } from "./Product";
import { CustomProduct } from "./CustomProduct";

export class Stock {
  id?: string;
  quantity: number;
  customPrice?: number;
  normalPrice?: number;
  suggestedPrice?: number;
  status: string;
  category: string;
  discountValue?: number;
  customProductId?: string;
  customProduct?: CustomProduct;
  storeId?: string;
  store?: Store;
  productId?: string;
  product?: Product;
  updatedAt?: Date;

  constructor(
    id?: string,
    quantity: number = 0,
    customPrice?: number,
    normalPrice?: number,
    suggestedPrice?: number,
    status: string = "Available",
    category?: string,
    discountValue?: number,
    customProductId?: string,
    customProduct?: CustomProduct,
    storeId?: string,
    store?: Store,
    productId?: string,
    product?: Product,
    updatedAt?: Date
  ) {
    this.id = id;
    this.quantity = quantity;
    this.customPrice = customPrice;
    this.normalPrice = normalPrice;
    this.suggestedPrice = suggestedPrice;
    this.status = status;
    this.discountValue = discountValue;
    this.category = category;
    this.customProduct = customProduct;
    this.customProductId = customProductId;
    this.storeId = storeId;
    this.store = store;
    this.productId = productId;
    this.product = product;
    this.updatedAt = updatedAt;
  }
}
