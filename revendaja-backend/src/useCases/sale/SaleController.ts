import { AppError } from "@/lib/AppError";
import { PrismaSaleRepository } from "@/repositories/sale/PrismaSaleRepository";
import { PrismaStockRepository } from "@/repositories/stock/PrismaStockRepository";
import { Request, Response } from "express";
import { CreateSaleUseCase } from "./createSale/CreateSaleUseCase";
import { GetSalesByStoreUseCase } from "./GetSalesByStoredId/GetSalesByStoreUseCase";
import { PrismaStoreRepository } from "@/repositories/store/PrismaStoreRepository";
import { GetLatestThreePurchasesUseCase } from "./getLatestThreePurchases/GetLatestThreePurchasesUseCase";
import { CalculateMonthlyBalanceUseCase } from "./calculateMonthlyBalance/CalculateMonthlyBalanceUseCase";
import { DeleteSaleUseCase } from "./deleteSale/DeleteSaleUseCase";
import { GetTheTopBestSellingProductsUseCase } from "./getTheTopBestSellingProducts/getTheTopBestSellingProductsUseCase";
import { CreateSalePendingUseCase } from "./createSalePending/CreateSalePendingUseCase";
import { GetSalesPendingByStoreUseCase } from "./getSalesPendingByStore/GetSalesPendingByStoreUseCase";
import { ConfirmSaleUseCase } from "./confirmSale/ConfirmSaleUseCase";
import { PrismaUserRepository } from "@/repositories/user/PrismaUserRepository";
import { BestSellingCompanyUseCase } from "./bestSellingCompany/BestSellingCompanyUseCase";

export class SaleController {
  async createSale(request: Request, response: Response) {
    try {
      const { storeId, items, customer, transactionType, status } =
        request.body;

      const { id} = request.user;
      const userId = id;
      const plan = request.user.plan

      const prismaStockRepository = new PrismaStockRepository();
      const prismaSaleRepository = new PrismaSaleRepository();
      const prismaStoreRepository = new PrismaStoreRepository();

      const createSaleUseCase = new CreateSaleUseCase(
        prismaSaleRepository,
        prismaStockRepository,
        prismaStoreRepository
      );

      const newSale = await createSaleUseCase.execute({
        items,
        userId,
        storeId,
        customer,
        transactionType,
        status,
        plan
      });

      return response.status(200).send(newSale);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async getSalesByStore(request: Request, response: Response) {
    try {
      const { month } = request.params;
      const { id } = request.user;
      const { page, pageSize, search } = request.query;

      const userId = id;
      const prismaSaleRepository = new PrismaSaleRepository();
      const prismaStoreRepository = new PrismaStoreRepository();

      const getSalesByStoreUseCase = new GetSalesByStoreUseCase(
        prismaSaleRepository,
        prismaStoreRepository
      );

      const getAll = await getSalesByStoreUseCase.execute(
        month,
        Number(page),
        Number(pageSize),
        userId,
        String(search)
      );

      return response.status(200).send(getAll);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async getLatestThreePurchases(request: Request, response: Response) {
    try {
      const { id } = request.user;
      const userId = id;

      const prismaSaleRepository = new PrismaSaleRepository();
      const prismaStoreRepository = new PrismaStoreRepository();

      const getLatestThreePurchasesUseCase = new GetLatestThreePurchasesUseCase(
        prismaSaleRepository,
        prismaStoreRepository
      );

      const latestSales = await getLatestThreePurchasesUseCase.execute(userId);

      return response.status(200).send(latestSales);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async calculateMonthlyBalance(request: Request, response: Response) {
    try {
      const { monthSelect } = request.params;
      const { id } = request.user;
      const userId = id;

      const prismaSaleRepository = new PrismaSaleRepository();
      const prismaStoreRepository = new PrismaStoreRepository();

      const calculateMonthlyBalanceUseCase = new CalculateMonthlyBalanceUseCase(
        prismaSaleRepository,
        prismaStoreRepository
      );

      const month = String(monthSelect);

      const calcuate = await calculateMonthlyBalanceUseCase.execute({
        month,
        userId,
      });

      return response.status(200).send(calcuate);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async deleteSale(request: Request, response: Response) {
    try {
      const { id } = request.user;
      const userId = id;

      const { saleId } = request.query;

      const prismaStoreRepository = new PrismaStoreRepository();
      const prismaSaleRepository = new PrismaSaleRepository();

      const deleteSaleUseCase = new DeleteSaleUseCase(
        prismaStoreRepository,
        prismaSaleRepository
      );

      const sale = await deleteSaleUseCase.execute(userId, String(saleId));

      return response.status(200).send(sale);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async GetTheTopBestSellingProducts(request: Request, response: Response) {
    try {
      const { subdomain } = request.query;

      const prismaSaleRepository = new PrismaSaleRepository();
      const prismaStoreRepository = new PrismaStoreRepository();

      const getLatestThreePurchasesUseCase =
        new GetTheTopBestSellingProductsUseCase(
          prismaSaleRepository,
          prismaStoreRepository
        );

      const latestSales = await getLatestThreePurchasesUseCase.execute(
        String(subdomain)
      );

      return response.status(200).send(latestSales);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async createSalePending(request: Request, response: Response) {
    try {
      const { subdomain, items, customer, transactionType, numberPhone } =
        request.body;

      const prismaStockRepository = new PrismaStockRepository();
      const prismaSaleRepository = new PrismaSaleRepository();
      const prismaStoreRepository = new PrismaStoreRepository();
      const prismaUserRepository = new PrismaUserRepository();

      const createSalePedingUseCase = new CreateSalePendingUseCase(
        prismaSaleRepository,
        prismaStoreRepository,
        prismaStockRepository,
        prismaUserRepository
      );

      const newSale = await createSalePedingUseCase.execute(
        String(subdomain),
        items,
        customer,
        transactionType,
        numberPhone
      );

      return response.status(200).send(newSale);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async getSalesPendingByStore(request: Request, response: Response) {
    try {
      const { id } = request.user;
      const { page, pageSize } = request.query;
      const prismaSaleRepository = new PrismaSaleRepository();
      const prismaStoreRepository = new PrismaStoreRepository();

      const getSalesPendingByStoreUseCase = new GetSalesPendingByStoreUseCase(
        prismaSaleRepository,
        prismaStoreRepository
      );

      const sales = await getSalesPendingByStoreUseCase.execute(
        id,
        Number(page),
        Number(pageSize)
      );

      return response.status(200).send(sales);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async confirmSale(request: Request, response: Response) {
    try {
      const { saleId } = request.body;
      const userId = request.user.id;
      const prismaStoreRepository = new PrismaStoreRepository();
      const prismaSaleRepository = new PrismaSaleRepository();
      const prismaStockRepository = new PrismaStockRepository();

      const confirmSaleUseCase = new ConfirmSaleUseCase(
        prismaSaleRepository,
        prismaStoreRepository,
        prismaStockRepository
      );

      const sale = await confirmSaleUseCase.execute(userId, saleId);

      return response.status(200).send(sale);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async bestSellingCompany(request: Request, response: Response) {
    try {
      const userId = request.user.id;

      const prismaSaleRepository = new PrismaSaleRepository();
      const prismaStoreRepository = new PrismaStoreRepository();
      const bestSellingCompanyUseCase = new BestSellingCompanyUseCase(
        prismaSaleRepository,
        prismaStoreRepository
      );

      const bestSelling = await bestSellingCompanyUseCase.execute(userId);

      return response.status(200).send(bestSelling);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }
}
