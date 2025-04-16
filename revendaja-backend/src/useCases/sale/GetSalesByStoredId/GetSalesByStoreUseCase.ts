import { SaleRepository } from "@/repositories/sale/SaleRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";

export class GetSalesByStoreUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private storeRepository: StoreRepository
  ) {}

  async execute(
    month: string,
    page: number,
    pageSize: number,
    userId: string,
    search: string
  ) {
    const storeId = await this.storeRepository.findStoreByUserId(userId);

    const sales = await this.saleRepository.getSalesByStore(
      storeId.id,
      month,
      search,
      page,
      pageSize
    );
    return sales;
  }
}
