import { StoreRepository } from "@/repositories/store/StoreRepository";
import { CreateStoreDTO } from "./CreateStoreDTO";
import { AppError } from "@/lib/AppError";
import { UserRepository } from "@/repositories/user/UserRepository";
import { RoleLimitsRepository } from "@/repositories/roleLimits/RoleLimitsRepository";

export class CreateStoreUseCase {
  constructor(
    private storeRepository: StoreRepository,
    private userRepository: UserRepository,
    private roleLimits: RoleLimitsRepository
  ) {}

  async execute({ name, description, userId, numberPhone }: CreateStoreDTO) {
    const userExist = await this.userRepository.findById(userId);

    if (!userExist) {
      throw new AppError("Usuário não existe", 400);
    }

    const storeLimit = await this.roleLimits.findStoreLimits(userExist.plan);

    const userStoresCount = await this.storeRepository.countStoresByUserId(userId);

    if (userStoresCount >= storeLimit.storeLimit) {
      throw new AppError("Você atingiu o limite máximo de lojas permitidas pelo seu plano.", 403);
    }

    const storeExist = await this.storeRepository.findByName(name);

    if (storeExist) {
      throw new AppError("Nome da loja em uso.", 400);
    }

    const subdomain = name.trim().toLowerCase().replace(/\s+/g, "");

    const store = await this.storeRepository.create(
      name,
      description,
      userId,
      subdomain,
      numberPhone
    );

    return store;
  }
}
