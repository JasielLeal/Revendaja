import { UserRepository } from "@/repositories/user/UserRepository";
import { UpdatePasswordDTO } from "./UpdatePasswordDTO";
import { AppError } from "@/lib/AppError";
import { hash } from "bcryptjs";


export class UpdatePasswordUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, newPassword }: UpdatePasswordDTO) {

    if (!email || !newPassword) {
      throw new AppError("Informe um email");
    }

    const user = this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const passwordHash = await hash(newPassword, 6);

    await this.userRepository.updatePassword(email, passwordHash);

    return;
  }
}
