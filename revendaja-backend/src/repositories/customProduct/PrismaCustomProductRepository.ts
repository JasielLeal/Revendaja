import { prisma } from "@/lib/prisma";
import { CustomProductRepository } from "./CustomProductRepository";
import { CustomProduct } from "@/entities/CustomProduct";

export class PrismaCustomProductRepository implements CustomProductRepository {
  // Função para adicionar um produto personalizado ao estoque
  async addCustomProductToStoreStock(
    data: CustomProduct
  ): Promise<CustomProduct | null> {
    // Cria um novo produto personalizado para a loja

    const customProduct = await prisma.customProduct.create({
      data: {
        storeId: data.storeId,
        name: data.name,
        normalPrice: data.normalPrice,
        suggestedPrice: data.suggestedPrice,
        imgUrl: data.imgUrl,
        brand: data.brand,
        quantity: data.quantity,
        barcode: data.barcode,
        category: data.category,
        company: data.company,
      },
    });

    return customProduct;
  }

  async deleteCustomProduct(storeId: string, customProductId: string) {
    const product = await prisma.customProduct.delete({
      where: {
        storeId,
        id: customProductId,
      },
      include: {
        stock: {
          include: {
            customProduct: true,
          },
        },
      },
    });

    return product;
  }

  async countingCustomProducts(storeId: string) {
    const customProducts = await prisma.customProduct.count({
      where: {
        storeId,
      },
    });

    return customProducts;
  }
}
