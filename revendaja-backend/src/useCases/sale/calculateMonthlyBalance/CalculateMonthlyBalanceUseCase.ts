import { SaleRepository } from "@/repositories/sale/SaleRepository";
import { CalculateMonthlyBalanceDTO } from "./CalculateMonthlyBalanceDTO";
import { StoreRepository } from "@/repositories/store/StoreRepository";
import { AppError } from "@/lib/AppError";

export class CalculateMonthlyBalanceUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private storeRepository: StoreRepository
  ) {}

  async execute({ month, userId }: CalculateMonthlyBalanceDTO) {
    const store = await this.storeRepository.findStoreByUserId(userId);

    if (!store) {
      throw new AppError("Loja não existe", 404);
    }

    const calculate = await this.saleRepository.calculateMonthlyBalance(
      store.id,
      month
    );

    return calculate;
  }
}
