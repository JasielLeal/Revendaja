import { AppError } from "@/lib/AppError";
import { StockRepository } from "@/repositories/stock/StockRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";

export class FindProductUseCase {
  constructor(
    private stockRepository: StockRepository,
    private storeRepository: StoreRepository
  ) {}

  async execute(subdomain: string, productId: string) {
    const store = await this.storeRepository.findBySubdomain(subdomain)

    if (!store) {
      throw new AppError("Loja não encontrada");
    }

    const product = await this.stockRepository.findProductOrCustomProduct(
      store.id,
      productId
    );

    if (!product) {
      throw new AppError("Produto não encontrado");
    }

    return product;
  }
}
