import { RoleLimitsRepository } from "@/repositories/roleLimits/RoleLimitsRepository";
import { CreateRoleLimitDTO } from "./CreateRoleLimitsDTO";

export class CreateRoleLimitsUseCase {
  constructor(private roleLimiteRepository: RoleLimitsRepository) {}

  async execute(data: CreateRoleLimitDTO) {

    const role = await this.roleLimiteRepository.create({
      bankSlipLimit: data.bankSlipLimit,
      customProductLimit: data.customProductLimit,
      role: data.role,
      saleLimit: data.saleLimit,
      stockLimit: data.stockLimit,
      storeLimit: data.storeLimit,
    });

    return role;
  }
}
