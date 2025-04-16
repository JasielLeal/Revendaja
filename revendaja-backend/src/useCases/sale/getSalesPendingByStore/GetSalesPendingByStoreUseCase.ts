import { AppError } from "@/lib/AppError";
import { SaleRepository } from "@/repositories/sale/SaleRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";

export class GetSalesPendingByStoreUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private storeRepository: StoreRepository
  ) {}

  async execute(userId: string, page: number, pageSize: number) {
    const store = await this.storeRepository.findStoreByUserId(userId);

    if (!store) {
      throw new AppError("Loja não encontrada", 404);
    }

    return await this.saleRepository.getSalesPendingByStore(
      store.id,
      page,
      pageSize
    );
  }
}
