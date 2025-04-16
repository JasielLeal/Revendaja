import { RoleLimits } from "@/entities/RoleLimits";
import { RoleLimitsRepository } from "./RoleLimitsRepository";
import { prisma } from "@/lib/prisma";

export class PrismaRoleLimitsRepository implements RoleLimitsRepository {
  async create(data: RoleLimits): Promise<RoleLimits> {
    const role = await prisma.roleLimit.create({
      data: {
        customProductLimit: data.customProductLimit,
        role: data.role,
        saleLimit: data.saleLimit,
        stockLimit: data.stockLimit,
        bankSlipLimit: data.bankSlipLimit,
        storeLimit: data.storeLimit,
      },
    });

    return role;
  }

  async findStoreLimits(role: string) {
    const limits = await prisma.roleLimit.findUnique({
      where: {
        role,
      },
    });

    return limits;
  }
}
