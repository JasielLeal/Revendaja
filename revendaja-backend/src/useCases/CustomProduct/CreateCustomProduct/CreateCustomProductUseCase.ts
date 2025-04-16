import { CustomProductRepository } from "@/repositories/customProduct/CustomProductRepository";
import { CreateCustomProductDTO } from "./CreateCustomProductDTO";
import { StoreRepository } from "@/repositories/store/StoreRepository";
import { AppError } from "@/lib/AppError";
import { StockRepository } from "@/repositories/stock/StockRepository";
import { RoleLimitsRepository } from "@/repositories/roleLimits/RoleLimitsRepository";
import { UserRepository } from "@/repositories/user/UserRepository";

export class CreateCustomProductUseCase {
  constructor(
    private customProductRepository: CustomProductRepository,
    private storeRepository: StoreRepository,
    private stockRepository: StockRepository,
    private roleLimitsRepository: RoleLimitsRepository,
    private userRepository: UserRepository
  ) {}

  async execute({
    name,
    normalPrice,
    suggestedPrice,
    imgUrl,
    userId,
    quantity,
    barcode,
  }: CreateCustomProductDTO) {
    
    const storeUser = await this.storeRepository.findStoreByUserId(userId);

    if (!storeUser) {
      throw new AppError("Loja não encontrada", 400);
    }

    const storeExist = await this.storeRepository.findById(storeUser.id);

    if (!storeExist) {
      throw new AppError("Loja não vinculado ao produto", 400);
    }

    const user = await this.userRepository.findById(userId)

   

    const limit = await this.roleLimitsRepository.findStoreLimits(user.plan)

    console.log(limit)

    const customProductsCount = await this.customProductRepository.countingCustomProducts(storeExist.id)

    if(customProductsCount>=limit.customProductLimit){
      throw new AppError("Você atingiu o limite máximo de produtos customizados do seu plano.", 403);
    }

    const customProduct =
      await this.customProductRepository.addCustomProductToStoreStock({
        storeId: storeUser.id,
        name,
        normalPrice: Number(normalPrice),
        suggestedPrice: Number(suggestedPrice),
        imgUrl,
        quantity,
        barcode,
        company: storeExist.name,
      });

    await this.stockRepository.addCustomProductToStoreStock(
      storeUser.id,
      Number(customProduct.suggestedPrice),
      Number(customProduct.normalPrice),
      Number(customProduct.suggestedPrice),
      customProduct.id,
      customProduct.quantity,
      customProduct.category
    );

    return { message: "Produto cadastrado com sucesso" };
  }
}
