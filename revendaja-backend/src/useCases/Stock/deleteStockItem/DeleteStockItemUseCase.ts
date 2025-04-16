import { AppError } from "@/lib/AppError";
import { s3 } from "@/lib/s3";
import { CustomProductRepository } from "@/repositories/customProduct/CustomProductRepository";
import { StockRepository } from "@/repositories/stock/StockRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

export class DeleteStockItemUseCase {
  constructor(
    private stockRepository: StockRepository,
    private storeRepository: StoreRepository,
    private customProductRepository: CustomProductRepository
  ) {}

  async execute(userId: string, productId: string) {
    const store = await this.storeRepository.findStoreByUserId(userId);

    if (!store) {
      throw new AppError("Loja não existe", 404);
    }

    const product = await this.stockRepository.deleteStockItem(
      store.id,
      productId
    );

    // Excluir produto customizado associado, se houver
    if (product.customProductId != null) {
      await this.customProductRepository.deleteCustomProduct(
        store.id,
        productId
      );

      const sanitizedProductName = product.customProduct.name.replace(
        /\s+/g,
        "-"
      );
      const imageKey = `produtos/${sanitizedProductName}`;

      try {
        const deleteParams = {
          Bucket: "revendaja",
          Key: imageKey, // A chave da imagem no S3
        };

        await s3.send(new DeleteObjectCommand(deleteParams));
        
      } catch (error) {
        console.error("Erro ao deletar a imagem do S3:", error);
        throw new AppError("Erro ao deletar imagem do S3");
      }
    }

    return { message: "Produto deletado com sucesso" };
  }
}
