import { AppError } from "@/lib/AppError";
import { ProductsRepository } from "@/repositories/products/ProductsRepository";

export class GetProductByIdUseCase {
  constructor(private productRepository: ProductsRepository) {}

  async execute(productId) {
    const productExist = await this.productRepository.findById(productId);

    if (!productExist) {
      throw new AppError("Produto não existe", 404);
    }

    return productExist;
  }
}
