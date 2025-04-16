import { BankSlipRepository } from "@/repositories/bankSlip/BankSlipRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";
import { AppError } from "@/lib/AppError";

export class ListAllStoreByStoreUsecase {
  constructor(
    private bankSlipRepository: BankSlipRepository,
    private storeRepository: StoreRepository
  ) {}

  async execute(page, pageSize, userId, companyName) {
    const store = await this.storeRepository.findStoreByUserId(userId);

    const storeId = store.id;

    if (!store) {
      throw new AppError("Loja não existe", 404);
    }

    const list = await this.bankSlipRepository.listAllByStore(
      storeId,
      page,
      pageSize,
      companyName
    );

    return list;
  }
}
