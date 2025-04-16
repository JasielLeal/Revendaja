import { AppError } from "@/lib/AppError";
import { SaleRepository } from "@/repositories/sale/SaleRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";

export class BestSellingCompanyUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private storeRepository: StoreRepository
  ) {}

  async execute(userId: string) {
    const store = await this.storeRepository.findStoreByUserId(userId);

    if (!store) {
      throw new AppError("Loja não encontrada", 404);
    }

    return await this.saleRepository.bestSellingCompany(store.id);
  }
}
