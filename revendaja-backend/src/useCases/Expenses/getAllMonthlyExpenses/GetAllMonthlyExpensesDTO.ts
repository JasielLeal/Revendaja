export interface GetAllMonthlyExpensesDTO {
  userId: string;
  page: number;
  pageSize: number;
  search: string;
  month: string;
}
