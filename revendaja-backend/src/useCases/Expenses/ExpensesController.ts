import { AppError } from "@/lib/AppError";
import { PrismaExpenseRepository } from "@/repositories/expenses/PrismaExpenseRepository";
import { PrismaStoreRepository } from "@/repositories/store/PrismaStoreRepository";
import { Request, Response } from "express";
import { CreateUseCase } from "./Create/CreateUseCase";
import { GetAllMonthlyExpensesUseCase } from "./getAllMonthlyExpenses/GetAllMonthlyExpensesUseCase";

export class ExpensesController {
  async Create(request: Request, response: Response) {
    try {
      const { id } = request.user;
      const { name, description, value } = request.body;
      const userId = id;

      const prismaExpensesRepository = new PrismaExpenseRepository();
      const prismaStoreRepository = new PrismaStoreRepository();
      const createUseCase = new CreateUseCase(
        prismaExpensesRepository,
        prismaStoreRepository
      );

      const expense = await createUseCase.execute({
        description,
        name,
        userId,
        value,
      });

      return response.status(200).send(expense);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async GetAllMonthlyExpenses(request: Request, response: Response) {
    try {
      const { id } = request.user;
      const { page, pageSize, search, month } = request.query;
      const newSearch = String(search);
      const newMonth = String(month);
      const userId = id;

      const prismaExpensesRepository = new PrismaExpenseRepository();
      const prismaStoreRepository = new PrismaStoreRepository();
      const getAllMonthlyExpensesUseCase = new GetAllMonthlyExpensesUseCase(
        prismaExpensesRepository,
        prismaStoreRepository
      );

      const list = await getAllMonthlyExpensesUseCase.execute({
        page: Number(page),
        pageSize: Number(pageSize),
        search: newSearch,
        userId,
        month: newMonth,
      });

      return response.status(200).send(list);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }
}
