import { UserRepository } from "@/repositories/user/UserRepository";

export class UpdatedExpoTokenUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(token: string, userId: string) {
    const expoToken = await this.userRepository.updateExpoToken(token, userId);

    return expoToken;
  }
}
