import { AppError } from "@/lib/AppError";
import { StockRepository } from "@/repositories/stock/StockRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";

export class FindProductsOnPromotionUseCase {
  constructor(
    private stockRepository: StockRepository,
    private storeRepository: StoreRepository
  ) {}

  async execute(subdomain: string, page: number, pageSize: number) {
    const store = await this.storeRepository.findBySubdomain(subdomain);

    if (!store) {
      throw new AppError("SLoja não encontrada", 404);
    }

    const stock = await this.stockRepository.findProductsOnPromotion(
      store.id,
      page,
      pageSize
    );

    return stock;
  }
}
