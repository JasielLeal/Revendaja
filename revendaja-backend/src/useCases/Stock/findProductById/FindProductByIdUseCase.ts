import { AppError } from "@/lib/AppError";
import { StockRepository } from "@/repositories/stock/StockRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";

export class FindProductByIdUseCase {
  constructor(
    private stockRepository: StockRepository,
    private storyRepository: StoreRepository
  ) {}

  async execute(subdomain: string, productId: string) {
    const storeExist = await this.storyRepository.findBySubdomain(subdomain);

    if (!storeExist) {
      throw new AppError("Loja não existe", 404);
    }

    const product = await this.stockRepository.findProductOrCustomProduct(
      storeExist.id,
      productId
    );

    if (!product) {
      throw new AppError("Produto não enonctrado", 404);
    }

    return product;
  }
}
