import { StockRepository } from "@/repositories/stock/StockRepository";
import { AddProductToStoreStockDTO } from "./AddProductToStoreStockDTO";
import { StoreRepository } from "@/repositories/store/StoreRepository";
import { AppError } from "@/lib/AppError";
import { ProductsRepository } from "@/repositories/products/ProductsRepository";
import { UserRepository } from "@/repositories/user/UserRepository";
import { RoleLimitsRepository } from "@/repositories/roleLimits/RoleLimitsRepository";

export class AddProductToStoreStockUseCase {
  constructor(
    private stockRepository: StockRepository,
    private storeRepository: StoreRepository,
    private productRepository: ProductsRepository,
    private userRepository: UserRepository,
    private roleLimitsRepository: RoleLimitsRepository
  ) {}

  async execute({
    barcode,
    customPrice,
    normalPrice,
    suggestedPrice,
    quantity,
    userId,
  }: AddProductToStoreStockDTO) {
    const storeExist = await this.storeRepository.findStoreByUserId(userId);
    console.log(barcode, customPrice, normalPrice, suggestedPrice, quantity);
    if (!storeExist) {
      throw new AppError("Loja não existe", 400);
    }

    const productExist = await this.productRepository.findByBarcode(barcode);

    if (!productExist) {
      throw new AppError("Produto não cadastrado", 400);
    }

    //const user = await this.userRepository.findById(userId)

    //const limit = await this.roleLimitsRepository.findStoreLimits(user.plan)
    //const countingProducts = await this.stockRepository.countingProducts(storeExist.id)

    //if(countingProducts >= limit.stockLimit){
    //throw new AppError("Você atingiu o limite máximo de produtos no seu estoque, atualize seu plano.", 403);
    //}

    const productExistInStock = await this.stockRepository.findProductInStock(
      storeExist.id,
      productExist.id
    );

    const finalPrice = customPrice ? customPrice : productExist.suggestedPrice;

    const newSuggestedPrice =
      suggestedPrice && suggestedPrice > 0
        ? suggestedPrice
        : productExist.suggestedPrice;

    const newNormalPrice =
      normalPrice && normalPrice > 0 ? normalPrice : productExist.normalPrice;

    if (productExistInStock) {
      // Se o produto já está no estoque mas está desativado, reativá-lo
      if (productExistInStock.status === "Disabled") {
        return await this.stockRepository.updateStockItem(
          productExistInStock.id,
          {
            status: "Available",
            quantity, // Atualiza com a nova quantidade fornecida
            customPrice: finalPrice,
            normalPrice: newNormalPrice,
            suggestedPrice: newSuggestedPrice,
          }
        );
      }
    }

    const addProduct = await this.stockRepository.addProductToStoreStock(
      storeExist.id,
      productExist.id,
      finalPrice,
      newNormalPrice,
      newSuggestedPrice,
      quantity,
      productExist.category
    );

    return addProduct;
  }
}
