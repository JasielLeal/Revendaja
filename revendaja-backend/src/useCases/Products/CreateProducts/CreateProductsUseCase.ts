import { ProductsRepository } from "@/repositories/products/ProductsRepository";
import { CreateProductsDTO } from "./CreateProductDTO";

export class CreateProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    normalPrice,
    suggestedPrice,
    brand,
    company,
    imgUrl,
    barcode,
    category
  }: CreateProductsDTO) {
    const newProduct = await this.productsRepository.create({
      name,
      normalPrice,
      suggestedPrice,
      brand,
      company,
      imgUrl,
      barcode,
      category
    });

    return newProduct;
  }
}
