import { AppError } from "@/lib/AppError";
import { StockRepository } from "@/repositories/stock/StockRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";

export class SearchDinamicUseCase {
  constructor(
    private storeRepository: StoreRepository,
    private stockRepository: StockRepository
  ) {}

  async execute(
    subdomain: string,
    search: string,
    page: number,
    pageSize: number,
    orderBy: string
  ) {
    const store = await this.storeRepository.findBySubdomain(subdomain);

    if (!store) {
      throw new AppError("Loja não existe", 404);
    }

    if (search === "perfumes" && "Perfumes") {
      const searchQuery = await this.stockRepository.searchDinamic(
        store.id,
        page,
        pageSize,
        "Perfume",
        orderBy
      );

      return searchQuery;
    }

    const searchQuery = await this.stockRepository.searchDinamic(
      store.id,
      page,
      pageSize,
      search,
      orderBy
    );

    return searchQuery;
  }
}
