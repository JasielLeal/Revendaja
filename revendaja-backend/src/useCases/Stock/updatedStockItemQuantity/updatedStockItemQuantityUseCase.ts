import { StockRepository } from "@/repositories/stock/StockRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";

export class UpdatedStockItemQuantityUseCase {
  constructor(
    private stockRepository: StockRepository,
    private storeRepository: StoreRepository
  ) {}

  async execute(stockId: string, quantity: number, userId) {
    const store = await this.storeRepository.findStoreByUserId(userId);

    if (!store) {
      throw new Error("Store not found");
    }

    const stockItem = await this.stockRepository.findStockItemById(
      stockId,
      store.id
    );

    if (!stockItem) {
      throw new Error("Stock item not found");
    }

    if (stockItem.quantity + quantity < 0) {
      throw new Error("Quantity cannot be negative");
    }

    await this.stockRepository.updatedStockItemQuantity(stockId, quantity);

    return;
  }
}
