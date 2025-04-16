import { RoleLimits } from "@/entities/RoleLimits";

export interface RoleLimitsRepository {
  create(data: RoleLimits): Promise<RoleLimits>;
  findStoreLimits(role: string)
}
