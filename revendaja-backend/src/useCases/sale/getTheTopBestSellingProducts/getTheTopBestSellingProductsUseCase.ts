import { AppError } from "@/lib/AppError";
import { SaleRepository } from "@/repositories/sale/SaleRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";

export class GetTheTopBestSellingProductsUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private storeRepository: StoreRepository
  ) {}

  async execute(subdomain: string) {

    const store = await this.storeRepository.findBySubdomain(subdomain);

    if (!store) {
      throw new AppError("Loja não encontrada", 404);
    }

    const sales = await this.saleRepository.getTheTopBestSellingProducts(
      store.id
    );

    return sales;
  }
}
