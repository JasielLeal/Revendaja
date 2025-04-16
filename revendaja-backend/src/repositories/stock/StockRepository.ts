import { Stock } from "@/entities/Stock";
import { CustomProduct, Product } from "@prisma/client";

export interface StockRepository {
  addProductToStoreStock(
    storeId: string,
    productId: string,
    customPrice?: number,
    normalPrice?: number,
    suggestedPrice?: number,
    quantity?: number,
    category?: string
  ): Promise<Stock | null>;

  findStoreItems(
    storeId: string,
    page: number,
    pageSize: number,
    search: string,
    filter: string
  ): Promise<{
    items: Stock[] | null;
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }>;

  findProductInStock(storeId: string, productId: string);

  addCustomProductToStoreStock(
    storeId: string,
    customPrice?: number,
    normalPrice?: number,
    suggestedPrice?: number,
    customProductId?: string,
    quantity?: number,
    category?: string
  ): Promise<Stock | null>;

  findStockProductsByStoreId(
    storeId: string,
    page: number,
    pageSize: number
  ): Promise<{
    items: Partial<{
      id: string;
      quantity: number;
      customPrice: number;
      normalPrice: number;
      status: string;
      productId: string;
      customProductId: string;
      product: {
        id: string;
        suggestedPrice: number;
        normalPrice: number;
        name: string;
        imgUrl: string;
        company: string;
      } | null;
      customProduct: {
        id: string;
        suggestedPrice: number;
        normalPrice: number;
        name: string;
        imgUrl: string;
      } | null;
    }>[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }>;

  findProductOrCustomProduct(
    storeId: string,
    productId: string
  ): Promise<{ product: Partial<Product> | Partial<CustomProduct> } | null>;

  updateStockPrice(
    productId: string,
    newPrice: number,
    storeId: string,
    discountValue: number
  );

  getDiscountValue(storeId: string, productId: string): Promise<number>;
  findStockByBarcode(barcode: string, storeId: string);

  updateStockQuantity(stockId: string, quantityChange: number);

  deleteStockItem(storeId: string, productId: string);

  hasActivePromotion(storeId: string, productId: string): Promise<boolean>;

  findProductsOnPromotion(storeId: string, page: number, pageSize: number);

  searchDinamic(
    storeId: string,
    page: number,
    pageSize: number,
    search: string,
    orderByOption: string
  );

  findStockById(stockId: string, storeId: string);

  findNewProducts(storeId: string);

  disabledProduct(storeId: string, productId: string);

  addQuantityToProductInStock(
    stockId: string,
    storeId: string,
    quantity: number
  );
  countingProducts(storeId: string);
  updateStockItem(
    stockId: string,
    updateData: Partial<{
      status: string;
      quantity: number;
      customPrice: number;
      normalPrice: number;
      suggestedPrice: number;
    }>
  );
}
