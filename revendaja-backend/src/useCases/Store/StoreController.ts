import { AppError } from "@/lib/AppError";
import { Request, Response } from "express";
import { CreateStoreDTO } from "./CreateStore/CreateStoreDTO";
import { PrismaStoreRepository } from "@/repositories/store/PrismaStoreRepository";
import { CreateStoreUseCase } from "./CreateStore/CreateStoreUseCase";
import { PrismaUserRepository } from "@/repositories/user/PrismaUserRepository";
import { VerifySubdomainUseCase } from "./VerifySubdomain/VerifySubdomainUseCase";
import { FindStoreNameByUserUseCase } from "./findStoreNameByUser/findStoreNameByUserUseCase";
import { ActiveStoreUseCase } from "./activeStore/ActiveStoreUseCase";
import {
  PrismaRoleLimitsRepository,
} from "@/repositories/roleLimits/PrismaRoleLimits";

export class StoreController {
  async CreateStore(request: Request, response: Response): Promise<any> {
    try {
      const { name, description, numberPhone }: CreateStoreDTO = request.body;
      const { id } = request.user;

      const userId = id;

      const prismaStoreRepository = new PrismaStoreRepository();
      const prismaUserRepository = new PrismaUserRepository();
      const prismaRoleLimitsRepository = new PrismaRoleLimitsRepository();

      const createStoryUseCase = new CreateStoreUseCase(
        prismaStoreRepository,
        prismaUserRepository,
        prismaRoleLimitsRepository
      );

      const newStore = await createStoryUseCase.execute({
        name,
        description,
        userId,
        numberPhone,
      });

      return response.status(200).send(newStore);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async VerifySubdomain(request: Request, response: Response): Promise<any> {
    try {
      const { subdomain } = request.params;

      const newSubdomain = String(subdomain);

      const prismaStoreRepository = new PrismaStoreRepository();

      const verifySubdomainUseCase = new VerifySubdomainUseCase(
        prismaStoreRepository
      );

      const subdomainExist = await verifySubdomainUseCase.execute(newSubdomain);

      return response.status(200).send({ exists: subdomainExist });
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async FindStoreNameByUser(
    request: Request,
    response: Response
  ): Promise<any> {
    try {
      const { id } = request.user;
      const userId = id;

      const prismaStoreRepository = new PrismaStoreRepository();
      const findStoreNameByUserUseCase = new FindStoreNameByUserUseCase(
        prismaStoreRepository
      );

      const store = await findStoreNameByUserUseCase.execute(userId);

      return response.status(200).send(store);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }

  async ActiveStore(request: Request, response: Response): Promise<any> {
    try {
      const prismaStoreRepository = new PrismaStoreRepository();
      const activeStoreUseCase = new ActiveStoreUseCase(prismaStoreRepository);

      const userId = request.user.id

      await activeStoreUseCase.execute(userId);

      return response.status(200).send({ message: "Loja ativada com sucesso" });
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }
}
