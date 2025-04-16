import { AppError } from "@/lib/AppError";
import { Request, Response } from "express";
import { CreateRoleLimitDTO } from "./Create/CreateRoleLimitsDTO";

import { CreateRoleLimitsUseCase } from "./Create/CreateRoleLimitsUseCase";
import { PrismaRoleLimitsRepository } from "@/repositories/roleLimits/PrismaRoleLimits";

export class RoleLimitsController {
  async CreateRoleLimit(request: Request, response: Response): Promise<any> {
    try {
      const {
        bankSlipLimit,
        customProductLimit,
        role,
        saleLimit,
        stockLimit,
        storeLimit,
      } = request.body as CreateRoleLimitDTO;

      const prismaRoleLimits = new PrismaRoleLimitsRepository();
      const createRoleLimits = new CreateRoleLimitsUseCase(prismaRoleLimits);

      const newRole = await createRoleLimits.execute({
        bankSlipLimit,
        customProductLimit,
        role,
        saleLimit,
        stockLimit,
        storeLimit,
      });

      return response.status(200).send(newRole);
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).send({ error: error.message });
      }

      return response.status(500).send({ error: error.message });
    }
  }
}
