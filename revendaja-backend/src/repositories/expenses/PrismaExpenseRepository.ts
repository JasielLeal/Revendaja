import { Expenses } from "@/entities/Expenses";
import { ExpenseRepository } from "./ExpensesRepository";
import { prisma } from "@/lib/prisma";
import { addHours, endOfMonth, startOfMonth, subMilliseconds } from "date-fns";

export class PrismaExpenseRepository implements ExpenseRepository {
  async create(data: Expenses): Promise<Expenses | null> {
    const expense = await prisma.expenses.create({
      data: {
        name: data.name,
        description: data.description,
        value: data.value,
        storeId: data.storeId,
      },
    });

    return expense;
  }

  async getAllMonthlyExpenses(
    storeId: string,
    page: number = 1,
    pageSize: number = 10,
    search: string,
    month: string
  ) {
    const year = new Date().getFullYear();
    const monthIndex = parseInt(month, 10) - 1;
    const selectedMonth = new Date(year, monthIndex, 1);

    const startDate = addHours(startOfMonth(selectedMonth), 3);
    const endDate = subMilliseconds(addHours(endOfMonth(selectedMonth), 3), 1);

    const totalItems = await prisma.expenses.count({
      where: {
        storeId: storeId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    const totalAmount = await prisma.expenses.aggregate({
      _sum: {
        value: true,
      },
      where: {
        storeId: storeId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const expensesItems = await prisma.expenses.findMany({
      where: {
        storeId,
        name: {
          contains: search,
        },
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * pageSize, // Pular os itens das páginas anteriores
      take: pageSize,
    });

    return {
      totalAmount: totalAmount._sum.value || 0,
      totalItems,
      totalPages,
      currentPage: page,
      expenses: expensesItems,
    };
  }
}
