import { ExpenseRepository } from "@/repositories/expenses/ExpensesRepository";
import { CreateDTO } from "./CreateDTO";
import { StoreRepository } from "@/repositories/store/StoreRepository";
import { AppError } from "@/lib/AppError";

export class CreateUseCase {
  constructor(
    private expensesRepository: ExpenseRepository,
    private storeRepository: StoreRepository
  ) {}

  async execute({ description, name, value, userId }: CreateDTO) {
    const store = await this.storeRepository.findStoreByUserId(userId);

    if (!store) {
      throw new AppError("Loja não existe", 404);
    }

    const expense = await this.expensesRepository.create({
      description,
      name,
      storeId: store.id,
      value,
    });

    return expense;
  }
}
