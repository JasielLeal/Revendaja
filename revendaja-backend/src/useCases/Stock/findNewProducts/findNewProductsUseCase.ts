import { StockRepository } from "@/repositories/stock/StockRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";
import { FindNewProductsDTO } from "./findNewProductsDTO";
import { AppError } from "@/lib/AppError";

export class FindNewProductsUseCase {
  constructor(
    private stockRepository: StockRepository,
    private storeRepository: StoreRepository
  ) {}

  async execute({ subdomain }: FindNewProductsDTO) {
    const store = await this.storeRepository.findBySubdomain(subdomain);

    if (!store) {
      throw new AppError("Loja não existe", 404);
    }

    const products = await this.stockRepository.findNewProducts(store.id);

    return products;
  }
}
