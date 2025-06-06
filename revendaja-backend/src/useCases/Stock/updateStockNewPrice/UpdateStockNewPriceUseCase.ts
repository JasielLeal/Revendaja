import { StockRepository } from "@/repositories/stock/StockRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";

export class UpdateStockNewPriceUseCase {
  constructor(
    private storeRepository: StoreRepository,
    private stockRepository: StockRepository
  ) {}

  async execute(
    userId: string,
    stockId: string,
    newPrice: number
  ): Promise<void> {
    const store = await this.storeRepository.findStoreByUserId(userId);

    if (!store) {
      throw new Error("Store not found for the given user ID");
    }

    await this.stockRepository.updateStockNewPrice(store.id, stockId, newPrice);
  }
}
