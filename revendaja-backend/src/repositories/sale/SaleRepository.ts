import { Sale } from "@prisma/client";

export interface SaleRepository {
  createSaleWithItems(
    saleItemsData: any[],
    totalPrice: number,
    storeId: string,
    customer: string,
    status: string,
    transactionType: string,
    numberPhone?: string
  );
  getSalesByStore(
    storeId: string,
    month: string,
    search: string,
    page?: number,
    pageSize?: number
  );

  getLatestThreePurchases(storeId: string);
  calculateMonthlyBalance(storeId: string, month: String);
  deleteSale(storeId: string, saleId: string);
  getTheTopBestSellingProducts(storeId: string);
  getSalesPendingByStore(storeId: string, page?: number, pageSize?: number);
  findSaleById(id: string, storeId: string): Promise<Sale | null>;
  updatedStatus(saleId: string): Promise<void>;
  bestSellingCompany(storeId: string);
  countSalesByDay(storeId: string): Promise<number>;
  
}
