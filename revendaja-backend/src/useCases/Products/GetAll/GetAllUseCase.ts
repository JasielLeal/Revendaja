import { ProductsRepository } from "@/repositories/products/ProductsRepository";
import { GetAllDTO } from "./GetAllDTO";

export class GetAllUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({ page, pageSize, search, filter }: GetAllDTO) {

    const products = await this.productsRepository.getAll(
      page,
      pageSize,
      search,
      filter
    );

    return products;
  }
}
