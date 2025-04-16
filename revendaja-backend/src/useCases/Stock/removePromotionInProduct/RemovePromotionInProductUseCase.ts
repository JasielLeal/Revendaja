import { AppError } from "@/lib/AppError";
import { StockRepository } from "@/repositories/stock/StockRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";

export class RemovePromotionInProductUseCase {
  constructor(
    private stockRepository: StockRepository,
    private storeRepository: StoreRepository
  ) {}

  async execute(productId: string, userId: string) {
    const storeExist = await this.storeRepository.findStoreByUserId(userId)

    if (!storeExist) {
      throw new AppError("Loja não existe", 404);
    }

    const stockItem = await this.stockRepository.findProductOrCustomProduct(
      storeExist.id,
      productId
    );

    const normalPrice =
      stockItem.customPrice ??
      stockItem.suggestedPrice ??
      stockItem.normalPrice;

    const getDiscount = await this.stockRepository.getDiscountValue(
      storeExist.id,
      productId
    );

    const newPrice = Number(normalPrice) + Number(getDiscount);

    const updatedStockItem = await this.stockRepository.updateStockPrice(
      stockItem.product.id,
      newPrice,
      storeExist.id,
      null
    );

    return updatedStockItem;
  }
}
