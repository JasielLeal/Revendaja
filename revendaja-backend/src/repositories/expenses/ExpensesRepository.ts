import { Expenses } from "@/entities/Expenses";

export interface ExpenseRepository {
  create(data: Expenses): Promise<Expenses | null>;
  getAllMonthlyExpenses(
    storeId: string,
    page: number,
    pageSize: number,
    search: string,
    month: string
  );
}
