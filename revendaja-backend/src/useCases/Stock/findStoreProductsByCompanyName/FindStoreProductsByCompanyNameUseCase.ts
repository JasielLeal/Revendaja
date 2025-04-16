import { StockRepository } from "@/repositories/stock/StockRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";

import { AppError } from "@/lib/AppError";

export class FindStoreProductsByCompanyNameUseCase {
  constructor(
    private storeRepository: StoreRepository,
    private stockRepository: StockRepository
  ) {}

  async execute({ storeName, page = 1, pageSize = 5 }) {
    const store = await this.storeRepository.findBySubdomain(storeName);

    if (!store) {
      throw new AppError("Error, Loja não existe", 404);
    }

    const stock = await this.stockRepository.findStockProductsByStoreId(
      store.id,
      page,
      pageSize
    );
    return stock;
  }
}
