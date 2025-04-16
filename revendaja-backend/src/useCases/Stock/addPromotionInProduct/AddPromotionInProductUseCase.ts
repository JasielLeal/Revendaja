import { AppError } from "@/lib/AppError";
import { StockRepository } from "@/repositories/stock/StockRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";
import { UserRepository } from "@/repositories/user/UserRepository";

export class AddPromotionInProductUseCase {
  constructor(
    private stockRepository: StockRepository,
    private storeRepository: StoreRepository, 
  ) {}

  async execute({ productId, userId, discountValue }) {

    console.log(productId, userId, discountValue);

    const storeExist = await this.storeRepository.findStoreByUserId(userId);

    if (!storeExist) {
      throw new AppError("Loja não existe", 404);
    }

    const stockItem = await this.stockRepository.findProductOrCustomProduct(
      storeExist.id,
      productId
    );

    const hasActivePromotion = await this.stockRepository.hasActivePromotion(
      storeExist.id,
      productId
    );

    if (hasActivePromotion) {
      throw new AppError("O produto já tem uma promoção ativa.", 400);
    }

    // Determina o preço base, usando customPrice se ele estiver presente
    const basePrice =
      stockItem.customPrice ??
      stockItem.suggestedPrice ??
      stockItem.normalPrice;

    const newPrice = Number(basePrice) - discountValue;

    if (newPrice < 0) {
      throw new AppError(
        "O desconto não pode resultar em um preço negativo.",
        400
      );
    }

    // Atualiza o item no estoque com o novo preço
    const updatedStockItem = await this.stockRepository.updateStockPrice(
      stockItem.product.id,
      newPrice,
      storeExist.id,
      discountValue
    );

    return updatedStockItem;
  }
}
