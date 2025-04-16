import { AppError } from "@/lib/AppError";
import { SaleRepository } from "@/repositories/sale/SaleRepository";
import { StockRepository } from "@/repositories/stock/StockRepository";
import { StoreRepository } from "@/repositories/store/StoreRepository";

interface SaleItemRequest {
  barcode: string;
  quantity: number;
}

interface CreateSaleRequest {
  storeId: string;
  customer: string;
  transactionType: string;
  status: string;
  items: SaleItemRequest[];
  userId: string;
  plan: string;
}

export class CreateSaleUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private stockRepository: StockRepository,
    private storeRepository: StoreRepository
  ) {}

  async execute({
    items,
    userId,
    customer,
    transactionType,
    plan,
  }: CreateSaleRequest) {
    let totalPrice = 0;
    const saleItemsData = [];

    const store = await this.storeRepository.findStoreByUserId(userId);

    // Verificar quantas vendas já foram feitas hoje
    if (plan == "Free") {
      const salesCountToday = await this.saleRepository.countSalesByDay(
        store.id
      );

      if (salesCountToday >= 10) {
        throw new AppError("Limite de 10 vendas diárias atingido.", 403);
      }
    }

    for (const item of items) {
      const stockItem = await this.stockRepository.findStockByBarcode(
        item.barcode,
        store.id
      );

      if (!stockItem) {
        throw new AppError(
          `Produto com código ${item.barcode} não encontrado ou não disponível no estoque da loja ${store.id}`,
          404
        );
      }

      if (stockItem.quantity < item.quantity) {
        throw new AppError(
          `Quantidade insuficiente no estoque para o produto com código ${item.barcode}`
        );
      }

      const price = stockItem.customPrice || stockItem.normalPrice || "0";
      const itemTotalPrice = parseFloat(price) * item.quantity;
      totalPrice += itemTotalPrice;

      saleItemsData.push({
        stockId: stockItem.id,
        quantity: item.quantity,
        price,
      });
    }

    const sale = await this.saleRepository.createSaleWithItems(
      saleItemsData,
      totalPrice,
      store.id,
      customer,
      "Approved",
      transactionType
    );

    for (const item of saleItemsData) {
      await this.stockRepository.updateStockQuantity(
        item.stockId,
        -item.quantity
      );
    }

    return sale;
  }
}
