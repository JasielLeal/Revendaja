import { UserRepository } from "@/repositories/user/UserRepository";

export class GetPlanUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    const plan = await this.userRepository.getPlan(userId);

    return plan;
  }
}
