import { AppError } from "@/lib/AppError";
import { SaleRepository } from "@/repositories/sale/SaleRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";

export class DeleteSaleUseCase {
  constructor(
    private storeRepository: StoreRepository,
    private saleRepository: SaleRepository
  ) {}

  async execute(userId: string, saleId: string) {
    const store = await this.storeRepository.findStoreByUserId(userId);

    if (!store) {
      throw new AppError("Loja não existe", 404);
    }

    await this.saleRepository.deleteSale(store.id, saleId);

    return { message: "Venda deletada com sucesso" };
  }
}
