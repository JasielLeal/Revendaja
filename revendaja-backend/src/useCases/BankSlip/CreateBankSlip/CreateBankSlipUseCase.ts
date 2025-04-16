import { BankSlipRepository } from "@/repositories/bankSlip/BankSlipRepository";
import { CreateBankSlipDTO } from "./CreateBankSlipDTO";
import { StoreRepository } from "@/repositories/store/StoreRepository";
import { AppError } from "@/lib/AppError";

export class CreateBankSlipUseCase {
  constructor(
    private bankSlipRepository: BankSlipRepository,
    private storeRepository: StoreRepository
  ) {}

  async execute({
    barcode,
    companyName,
    dueDate,
    userId,
    value,
  }: CreateBankSlipDTO) {
    const store = await this.storeRepository.findStoreByUserId(userId);

    if (!store) {
      throw new AppError("Loja não existe", 404); AppError
    }
    
    const bankSlipExist = await this.bankSlipRepository.findByBarcode(barcode);

    if (bankSlipExist) {
      throw new AppError("Boleto já cadastrado", 400);
    }

    const bankSlip = await this.bankSlipRepository.create({
      barcode,
      companyName,
      dueDate,
      storeId: store.id,
      value,
    });

    return bankSlip;
  }
}
