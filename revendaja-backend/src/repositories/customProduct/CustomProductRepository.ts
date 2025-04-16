import { CustomProduct } from "@/entities/CustomProduct";

export interface CustomProductRepository {
  addCustomProductToStoreStock(
    data: CustomProduct
  ): Promise<CustomProduct | null>;
  deleteCustomProduct(storeId: string, customProductId: string);
  countingCustomProducts(storeId: string)
}
