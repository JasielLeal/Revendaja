import { AppError } from "@/lib/AppError";
import { StoreRepository } from "@/repositories/store/StoreRepository";

export class VerifySubdomainUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(subdomain: string) {

    const subdomainExist = await this.storeRepository.findBySubdomain(
      subdomain
    );

    if (!subdomainExist) {
      throw new AppError("Error, dominio não existe", 404);
    }

    return subdomainExist;
  }
}
