import { AppError } from "@/lib/AppError";
import { PrismaBankSlipRepository } from "@/repositories/bankSlip/PrismaBankSlipRepository";
import { PrismaStoreRepository } from "@/repositories/store/PrismaStoreRepository";
import { Request, Response } from "express";
import { CreateBankSlipUseCase } from "./CreateBankSlip/CreateBankSlipUseCase";
import { CreateBankSlipDTO } from "./CreateBankSlip/CreateBankSlipDTO";
import { ListAllStoreByStoreUsecase } from "./ListAllByStore/ListAllByStoreUseCase";
import { DeleteByIdUseCase } from "./DeleteById/DeleteByIdUseCase";
import { CheckValidityBankSlipUseCase } from "./checkValidityBankSlip/CheckValidityBankSlipUseCase";

export class BankSlipController {
  async createBankSlip(request: Request, response: Response): Promise<any> {
    try {
      const { id } = request.user;
      const { barcode, companyName, dueDate, value }: CreateBankSlipDTO =
        request.body;

      const userId = id;

      const prismaBankSlipRepository = new PrismaBankSlipRepository();
      const prismaStoreRepository = new PrismaStoreRepository();

      const createBankSlipUseCase = new CreateBankSlipUseCase(
        prismaBankSlipRepository,
        prismaStoreRepository
      );

      const newBankSlip = await createBankSlipUseCase.execute({
        barcode,
        companyName,
        dueDate,
        userId,
        value,
      });

      return response.status(200).send(newBankSlip);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }
      return response.status(500).send({ error: error.message });
    }
  }

  async listAllByStore(request: Request, response: Response): Promise<any> {
    try {
      const { id } = request.user;
      const userId = id;

      const { page, pageSize, companyName } = request.query;
      const prismaBankSlipRepository = new PrismaBankSlipRepository();
      const prismaStoreRepository = new PrismaStoreRepository();

      const listAllByStoreUseCase = new ListAllStoreByStoreUsecase(
        prismaBankSlipRepository,
        prismaStoreRepository
      );

      const list = await listAllByStoreUseCase.execute(
        page,
        pageSize,
        userId,
        companyName
      );

      return response.status(200).send(list);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }
      return response.status(500).send({ error: error.message });
    }
  }

  async deleteById(request: Request, response: Response): Promise<any> {
    try {
      const { bankSlipId } = request.params;
      const { id } = request.user;
      const userId = id;

      const prismaBankSlipRepository = new PrismaBankSlipRepository();
      const prismaStoreRepository = new PrismaStoreRepository();
      const deleteByIdUseCase = new DeleteByIdUseCase(
        prismaBankSlipRepository,
        prismaStoreRepository
      );

      await deleteByIdUseCase.execute({ bankSlipId, userId });

      return response.status(200).send();
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }
      return response.status(500).send({ error: error.message });
    }
  }

  async CheckValidityBankSlip(
    request: Request,
    response: Response
  ): Promise<any> {
    try {
      const { id, expoToken } = request.user;

      const prismaBankSlipRepository = new PrismaBankSlipRepository();
      const prismaStoreRepository = new PrismaStoreRepository();

      const checkValidiyBankSlipUseCase = new CheckValidityBankSlipUseCase(
        prismaBankSlipRepository,
        prismaStoreRepository
      );

      const bankSlips = await checkValidiyBankSlipUseCase.execute(
        id,
        expoToken
      );

      return response.status(200).send(bankSlips);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }
      return response.status(500).send({ error: error.message });
    }
  }
}
