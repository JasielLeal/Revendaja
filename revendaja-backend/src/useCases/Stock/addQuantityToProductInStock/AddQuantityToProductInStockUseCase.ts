import { StockRepository } from "@/repositories/stock/StockRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";
import { AddQuantityToProductInStockDTO } from "./AddQuantityToProductInStockDTO";
import { AppError } from "@/lib/AppError";

export class AddQuantityToProductInStockUseCase {
  constructor(
    private stockRepository: StockRepository,
    private storeRepository: StoreRepository
  ) {}

  async execute(data: AddQuantityToProductInStockDTO) {
    const store = await this.storeRepository.findStoreByUserId(data.userId);

    if (!store) {
      throw new AppError("Store not found", 404);
    }

    const stockUpdated = await this.stockRepository.addQuantityToProductInStock(
      data.productId,
      store.id,
      data.quantity
    );

    return stockUpdated;
  }
}
