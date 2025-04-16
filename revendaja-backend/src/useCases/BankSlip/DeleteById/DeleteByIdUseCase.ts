import { BankSlipRepository } from "@/repositories/bankSlip/BankSlipRepository";
import { DeleteByIdDTO } from "./DeleteByIdDTO";
import { AppError } from "@/lib/AppError";
import { StoreRepository } from "@/repositories/store/StoreRepository";

export class DeleteByIdUseCase {
  constructor(
    private bankSlipRepository: BankSlipRepository,
    private storeRepository: StoreRepository
  ) {}

  async execute({ bankSlipId, userId }: DeleteByIdDTO) {
    const store = await this.storeRepository.findStoreByUserId(userId);

    if (!store) {
      throw new AppError("Loja não existe", 404);
    }

    const bankslip = await this.bankSlipRepository.findById(bankSlipId);

    if (!bankslip) {
      throw new AppError("Boleto não encontrado", 404);
    }

    const deleteBankSlip = await this.bankSlipRepository.deleteById(
      bankSlipId,
      store.id
    );

    if (!deleteBankSlip || deleteBankSlip == null) {
      throw new AppError("Boleto não pertecer a sua loja", 401);
    }

    return;
  }
}
