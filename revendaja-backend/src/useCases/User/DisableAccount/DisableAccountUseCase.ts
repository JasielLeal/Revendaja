import { AppError } from "@/lib/AppError";
import { UserRepository } from "@/repositories/user/UserRepository";

export class DisableAccountUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário não existe", 404);
    }

    const status = "Disabled";

    await this.userRepository.updateStatus(status, email);

    return;
  }
}
