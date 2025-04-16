import { AppError } from "@/lib/AppError";
import { StoreRepository } from "@/repositories/store/StoreRepository";

export class FindStoreNameByUserUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(userId: string) {
    const store = await this.storeRepository.findStoreByUserId(userId);

    if (!store) {
      throw new AppError("Loja não existe", 404);
    }

    return store.subdomain;
  }
}
