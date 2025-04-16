import { AppError } from "@/lib/AppError";
import { UserRepository } from "@/repositories/user/UserRepository";

export class VerifyEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(code: string, email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário não existe", 404);
    }

    if (user.verificationCode !== code) {
      throw new AppError("Código de verificação inválido.", 400);
    }

    const status = "Enable";

    await this.userRepository.updateStatus(status, email);

    const emailVerified = new Date();

    await this.userRepository.updateEmailVerified(email, emailVerified);
  }
}
