import { AppError } from "@/lib/AppError";
import { SaleRepository } from "@/repositories/sale/SaleRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";
import { StockRepository } from "@/repositories/stock/StockRepository";
import { io } from "@/server";

export class ConfirmSaleUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private storeRepository: StoreRepository,
    private stockRepository: StockRepository
  ) {}

  async execute(userId: string, saleId: string) {
    const store = await this.storeRepository.findStoreByUserId(userId);

    if (!store) {
      throw new AppError("A loja não existe", 404);
    }

    const sale = await this.saleRepository.findSaleById(saleId, store.id);

    if (!sale) {
      throw new AppError("A venda não existe", 404);
    }

    if (sale.status === "Approved") {
      throw new AppError("A venda já foi confirmada", 400);
    }

    // Iterar sobre os itens da venda para verificar e atualizar o estoque
    for (const item of sale.saleItems) {
      // Obter o estoque atual do item

      const productId = item.stock.product ? item.stock.product.id : item.stock.customProduct?.id;

      const stock = await this.stockRepository.findStockById(productId, store.id);

      if (!stock) {
        throw new AppError(
          `Estoque insuficiente`,
          404
        );
      }

      // Verificar se a quantidade disponível é suficiente
      if (stock.quantity < item.quantity) {
        throw new AppError(
          `Estoque insuficiente para o item ${
            stock.product?.name || "desconhecido"
          }. Disponível: ${stock.quantity}, Necessário: ${item.quantity}`,
          400
        );
      }

      // Atualizar a quantidade no estoque
      await this.stockRepository.updateStockQuantity(
        item.stockId,
        -item.quantity
      );
    }

    // Atualizar o status da venda
    await this.saleRepository.updatedStatus(saleId);

    return { message: "Venda finalizado com sucesso" };
  }
}
