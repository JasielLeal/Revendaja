import { authenticated } from "@/middleware/isAuthenticated";
import { ExpensesController } from "@/useCases/Expenses/ExpensesController";
import { Router } from "express";

const expenseController = new ExpensesController();

export const RoutesExpenses = Router();

RoutesExpenses.post("/create", authenticated, expenseController.Create);
RoutesExpenses.get("/getAllMonthlyExpenses", authenticated, expenseController.GetAllMonthlyExpenses);
