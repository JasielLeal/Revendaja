import { AppError } from "@/lib/AppError";
import { SaleRepository } from "@/repositories/sale/SaleRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";

export class GetLatestThreePurchasesUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private storeRepository: StoreRepository
  ) {}

  async execute(userId) {
    const store = await this.storeRepository.findStoreByUserId(userId);

    if (!store) {
      throw new AppError("Loja não existe", 404);
    }

    const latestSales = await this.saleRepository.getLatestThreePurchases(
      store.id
    );

    return latestSales;
  }
}
