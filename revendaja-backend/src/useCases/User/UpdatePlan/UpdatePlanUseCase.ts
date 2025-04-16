import { AppError } from "@/lib/AppError";
import { UserRepository } from "@/repositories/user/UserRepository";

export class UpdatePlanUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, plan: string) {

    if (!plan) {
      throw new AppError("Plano não informado");
    }

    await this.userRepository.updatePlan(userId, plan);

    return "Plano atualizado com sucesso";
  }
}
