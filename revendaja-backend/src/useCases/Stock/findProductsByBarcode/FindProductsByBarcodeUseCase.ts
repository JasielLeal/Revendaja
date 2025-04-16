import { AppError } from "@/lib/AppError";
import { StockRepository } from "@/repositories/stock/StockRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";

export class FindProductsByBarcodeUseCase {
  constructor(
    private stockRepository: StockRepository,
    private storeRepository: StoreRepository
  ) {}

  async execute(barcode: string, userId: string) {
    const store = await this.storeRepository.findStoreByUserId(userId);
    console.log(barcode)
    if (!store) {
      throw new AppError("Loja não existe", 404);
    }

    const product = await this.stockRepository.findStockByBarcode(
      barcode,
      store.id
    );

    if (!product) {
      throw new AppError("Produto não encontrado no estoque", 404);
    }

    return product;
  }
}
