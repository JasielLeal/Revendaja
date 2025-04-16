import { ExpenseRepository } from "@/repositories/expenses/ExpensesRepository";
import { GetAllMonthlyExpensesDTO } from "./GetAllMonthlyExpensesDTO";
import { StoreRepository } from "@/repositories/store/StoreRepository";
import { AppError } from "@/lib/AppError";

export class GetAllMonthlyExpensesUseCase {
  constructor(
    private expenseRepository: ExpenseRepository,
    private storeRepository: StoreRepository
  ) {}

  async execute({
    page,
    pageSize,
    search,
    userId,
    month,
  }: GetAllMonthlyExpensesDTO) {
    const store = await this.storeRepository.findStoreByUserId(userId);

    if (!store) {
      throw new AppError("Loja não existe", 404);
    }

    const expenses = await this.expenseRepository.getAllMonthlyExpenses(
      store.id,
      page,
      pageSize,
      search,
      month
    );

    return expenses;
  }
}
