import { prisma } from "@/lib/prisma";
import { StockRepository } from "./StockRepository";
import { Stock } from "@/entities/Stock";
import { AppError } from "@/lib/AppError";
import Redis from "ioredis";
import { redis } from "redis";

export class PrismaStockRepository implements StockRepository {
  async addProductToStoreStock(
    storeId: string,
    productId: string,
    customPrice?: number,
    normalPrice?: number,
    suggestedPrice?: number,
    quantity?: number,
    category?: string
  ) {
    const addProduct = await prisma.stock.create({
      data: {
        storeId,
        productId,
        normalPrice,
        customPrice,
        suggestedPrice,
        quantity,
        category,
      },
    });

    return addProduct;
  }

  async addCustomProductToStoreStock(
    storeId: string,
    customPrice?: number,
    normalPrice?: number,
    suggestedPrice?: number,
    customProductId?: string,
    quantity?: number,
    category?: string
  ) {
    const addProduct = await prisma.stock.create({
      data: {
        customPrice,
        normalPrice,
        suggestedPrice,
        storeId,
        customProductId: customProductId,
        quantity,
        category,
      },
    });

    return addProduct;
  }

  async findStoreItems(
    storeId: string,
    page: number = 1,
    pageSize: number = 5,
    search: string,
    filter: string
  ): Promise<{
    items: Stock[] | null;
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }> {
    // Contar o total de itens no estoque da loja
    const totalItems = await prisma.stock.count({
      where: {
        storeId: storeId,
        status: { not: "Disabled" },
      },
    });

    // Calcular o total de páginas
    const totalPages = Math.ceil(totalItems / pageSize);

    const whereCondition: any = {
      storeId: storeId,
      status: { not: "Disabled" }, // Apenas itens disponíveis
      OR: [
        {
          product: {
            name: {
              contains: search,
              mode: "insensitive", // Torna a busca case-insensitive
            },
          },
        },
        {
          customProduct: {
            name: {
              contains: search,
              mode: "insensitive", // Torna a busca case-insensitive
            },
          },
        },
      ],
    };

    switch (filter) {
      case "personalizados":
        whereCondition.productId = null;
        // Remover a condição OR para produtos padrão

        break;

      case "vencidos":
        whereCondition.expirationDate = {
          lt: new Date(), // Filtrar itens com data de vencimento anterior a hoje
        };
        break;

      case "comEstoque":
        whereCondition.quantity = {
          gt: 0, // Filtrar itens com quantidade maior que zero
        };
        break;

      case "semEstoque":
        whereCondition.quantity = {
          lte: 0, // Filtrar itens com quantidade menor ou igual a zero
        };
        break;

      default:
      // Caso o filtro não seja reconhecido, não altera a condição
    }

    // Obter os itens do estoque com paginação
    const stockItems = await prisma.stock.findMany({
      where: whereCondition,
      include: {
        customProduct: true,
        product: true,
      },
      skip: (page - 1) * pageSize, // Pular os itens das páginas anteriores
      take: pageSize, // Limitar o número de itens retornados
    });

    return {
      totalItems,
      totalPages,
      currentPage: page, // Retornando a página atual
      items: stockItems,
    };
  }

  async findProductInStock(storeId: string, productId: string) {
    const existingStock = await prisma.stock.findUnique({
      where: {
        storeId_productId: {
          storeId: storeId,
          productId: productId,
        },
      },
      include: {
        product: true,
      },
    });

    return existingStock;
  }

  async findStockProductsByStoreId(
    storeId: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<{
    items: Partial<{
      id: string;
      quantity: number;
      customPrice: number;
      normalPrice: number;
      status: string;
      productId: string;
      customProductId: string;
      product: {
        id: string;
        suggestedPrice: number;
        normalPrice: number;
        name: string;
        imgUrl: string;
        company: string;
      } | null;
      customProduct: {
        id: string;
        suggestedPrice: number;
        normalPrice: number;
        name: string;
        imgUrl: string;
      } | null;
    }>[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }> {
    const totalItems = await prisma.stock.count({
      where: {
        storeId: storeId,
      },
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    const stockItems = await prisma.stock.findMany({
      where: {
        storeId,
      },
      select: {
        id: true,
        quantity: true,
        customPrice: true,
        normalPrice: true,
        status: true,
        productId: true,
        customProductId: true,
        customProduct: {
          select: {
            name: true,
            normalPrice: true,
            id: true,
            suggestedPrice: true,
            imgUrl: true,
          },
        },
        product: {
          select: {
            name: true,
            normalPrice: true,
            company: true,
            id: true,
            suggestedPrice: true,
            imgUrl: true,
          },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      totalItems,
      totalPages,
      currentPage: page, // Retornando a página atual
      items: stockItems,
    };
  }

  async findProductOrCustomProduct(storeId: string, productId: string) {
    const cacheKey = `store:${storeId}:product:${productId}`;

    // 1. Verifica no cache
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // Consulta ÚNICA com OR condicional
    const stockItem = await prisma.stock.findFirst({
      where: {
        storeId,
        OR: [{ productId }, { customProductId: productId }],
      },
      select: {
        // SELECT explícito > INCLUDE
        quantity: true,
        discountValue: true,
        customPrice: true,
        suggestedPrice: true,
        normalPrice: true,
        product: {
          select: {
            id: true,
            name: true,
            imgUrl: true,
            brand: true,
            company: true,
            stock: true,
            normalPrice: true
            // APENAS campos necessários
          },
        },
        customProduct: {
          select: {
            id: true,
            name: true,
            imgUrl: true,
            brand: true,
            company: true,
            stock: true,
            normalPrice: true
            // APENAS campos necessários
          },
        },
      },
    });

    if (!stockItem) return null;

    const productData = stockItem.product;

    const result = {
      product: productData,
      quantity: stockItem.quantity,
      discountValue: stockItem.discountValue,
      customPrice: stockItem.customPrice,
      suggestedPrice: stockItem.suggestedPrice,
      normalPrice: stockItem.normalPrice,
    };

    // 3. Salva no cache com TTL de 10 minutos
    await redis.set(cacheKey, JSON.stringify(result), "EX", 60 * 10);

    return result;
  }

  async updateStockPrice(
    productId: string,
    newPrice: number,
    storeId: string,
    discountValue: number
  ) {
    // Primeiro, tenta encontrar o produto padrão no estoque
    const stockProduct = await prisma.stock.findFirst({
      where: {
        storeId: storeId,
        productId: productId,
      },
    });

    // Se o produto padrão foi encontrado, atualiza o preço
    if (stockProduct) {
      return await prisma.stock.update({
        where: { id: stockProduct.id },
        data: {
          customPrice: newPrice,
          discountValue: discountValue, // Certifique-se de que é um número
        },
      });
    }

    // Se não encontrou um produto padrão, procura um CustomProduct
    const customProduct = await prisma.customProduct.findFirst({
      where: {
        storeId: storeId,
        id: productId,
      },
    });

    // Se um produto customizado foi encontrado, atualiza o preço
    if (customProduct) {
      // Tenta encontrar o registro do estoque associado ao customProduct
      const stockForCustomProduct = await prisma.stock.findFirst({
        where: {
          storeId: storeId,
          customProductId: customProduct.id, // Use o id do customProduct aqui
        },
      });

      // Se o registro do estoque para o produto customizado foi encontrado
      if (stockForCustomProduct) {
        return await prisma.stock.update({
          where: { id: stockForCustomProduct.id },
          data: {
            customPrice: newPrice,
            discountValue: discountValue, // Certifique-se de que é um número
          },
        });
      }
    }

    // Se nenhum produto padrão ou customizado foi encontrado, lança um erro
    throw new Error(
      `Produto não encontrado no estoque para storeId: ${storeId} e productId: ${productId}`
    );
  }

  async getDiscountValue(storeId: string, productId: string): Promise<number> {
    // Verificar se o produto é do tipo Product
    const stockProduct = await prisma.stock.findFirst({
      where: {
        storeId: storeId,
        productId: productId,
      },
      select: {
        discountValue: true,
      },
    });

    if (stockProduct && stockProduct.discountValue !== null) {
      return stockProduct.discountValue;
    }

    // Verificar se o produto é do tipo CustomProduct
    const customStockProduct = await prisma.stock.findFirst({
      where: {
        storeId: storeId,
        customProductId: productId,
      },
      select: {
        discountValue: true,
      },
    });

    if (customStockProduct && customStockProduct.discountValue !== null) {
      return customStockProduct.discountValue;
    }

    // Retorna 0 se não houver desconto
    return 0;
  }

  async findStockByBarcode(barcode: string, storeId: string) {
    return await prisma.stock.findFirst({
      where: {
        storeId,
        OR: [{ product: { barcode } }, { customProduct: { barcode } }],
        status: "Available",
      },
      include: {
        product: true,
        customProduct: true,
      },
    });
  }

  async updateStockQuantity(stockId: string, quantityChange: number) {
    const updatedStock = await prisma.stock.update({
      where: { id: stockId },
      data: {
        quantity: {
          increment: quantityChange, // Pode ser negativo ou positivo
        },
      },
    });

    return updatedStock;
  }

  async deleteStockItem(storeId: string, productId: string) {
    // Verifique se o item é um produto normal ou customizado
    const stockItem = await prisma.stock.findFirst({
      where: {
        storeId,
        OR: [
          { productId },
          { customProductId: productId }, // Para tratar produtos customizados usando o mesmo parâmetro
        ],
      },
    });

    if (!stockItem) {
      throw new AppError("Produto não encontrado no estoque.", 404);
    }

    // Excluir o item baseado no tipo de produto (normal ou customizado)
    const deletedProduct = await prisma.stock.delete({
      where: {
        id: stockItem.id, // Usa o ID único do item
      },
      include: {
        customProduct: true,
      },
    });

    return deletedProduct;
  }

  async hasActivePromotion(
    storeId: string,
    productId: string
  ): Promise<boolean> {
    // Verificar se o produto é do tipo Product
    const stockProduct = await prisma.stock.findFirst({
      where: {
        storeId: storeId,
        productId: productId,
        discountValue: {
          not: null, // Verifica se há um valor de desconto ativo
        },
      },
    });

    if (stockProduct) {
      return true;
    }

    // Verificar se o produto é do tipo CustomProduct
    const customStockProduct = await prisma.stock.findFirst({
      where: {
        storeId: storeId,
        customProductId: productId,
        discountValue: {
          not: null, // Verifica se há um valor de desconto ativo
        },
      },
    });

    if (customStockProduct) {
      return true;
    }

    // Retorna false se não houver promoção ativa
    return false;
  }

  async findProductsOnPromotion(
    storeId: string,
    page: number = 1,
    pageSize: number = 10
  ) {
    const totalItems = await prisma.stock.count({
      where: {
        storeId: storeId,
        discountValue: {
          not: null,
        },
      },
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    const products = await prisma.stock.findMany({
      where: {
        storeId,
        discountValue: {
          not: null,
        },
      },
      include: {
        product: true,
        customProduct: true,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      totalItems,
      totalPages,
      currentPage: page, // Retornando a página atual
      items: products,
    };
  }

  async searchDinamic(
    storeId: string,
    page: number = 1,
    pageSize: number = 10,
    search: string,
    orderByOption: string
  ) {
    // Contar o total de itens no estoque da loja

    const totalItems = await prisma.stock.count({
      where: {
        storeId, // Isso garante que o storeId seja obrigatório
        OR: [
          {
            product: {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { category: { contains: search, mode: "insensitive" } },
                { company: { contains: search, mode: "insensitive" } },
              ],
            },
          },
          {
            customProduct: {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { category: { contains: search, mode: "insensitive" } },
              ],
            },
          },
        ],
      },
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    let orderBy = {};
    switch (orderByOption) {
      case "maxPrice":
        orderBy = { customPrice: "desc" };
        break;
      case "minPrice":
        orderBy = { customPrice: "asc" };
        break;
      default:
        orderBy = { updatedAt: "desc" }; // Ordenação padrão por data de atualização
        break;
    }

    const productsList = await prisma.stock.findMany({
      where: {
        storeId, // Isso garante que o storeId seja obrigatório
        OR: [
          {
            product: {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { brand: { contains: search, mode: "insensitive" } },
                { category: { contains: search, mode: "insensitive" } },
                { company: { contains: search, mode: "insensitive" } },
              ],
            },
          },
          {
            customProduct: {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { brand: { contains: search, mode: "insensitive" } },
                { category: { contains: search, mode: "insensitive" } },
              ],
            },
          },
        ],
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        customProduct: true,
        product: true,
      },
      orderBy: orderBy,
    });

    return {
      totalItems,
      totalPages,
      currentPage: page, // Retornando a página atual
      items: productsList,
    };
  }

  async findStockById(stockId: string, storeId: string) {
    const itemStock = await prisma.stock.findFirst({
      where: {
        storeId,
        OR: [
          {
            productId: stockId,
          },
          {
            customProductId: stockId,
          },
        ],
      },
      include: {
        customProduct: true,
        product: true,
      },
    });

    return itemStock;
  }

  async findNewProducts(storeId: string) {
    // Verifica se o produto já está no cache
    const cacheKey = `store:${storeId}:new-products`;
    const cachedProducts = await redis.get(cacheKey);
    if (cachedProducts) {
      console.log("Tem cache")
      return JSON.parse(cachedProducts);
    }

    const products = await prisma.stock.findMany({
      where: {
        storeId,
        quantity: {
          gt: 0,
        },
      },
      include: {
        customProduct: true,
        product: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    await redis.setex(
      cacheKey,
      300, // 5 minutos de cache (ajuste conforme necessidade)
      JSON.stringify(products)
    )

    return products;
  }

  async disabledProduct(storeId: string, productId: string) {
    const product = await prisma.stock.updateMany({
      where: {
        storeId,
        OR: [
          { productId },
          { customProductId: productId }, // Tratar produtos customizados
        ],
      },
      data: {
        status: "Disabled",
      },
    });

    return product;
  }

  async addQuantityToProductInStock(
    stockId: string,
    storeId: string,
    quantity: number
  ) {
    const product = await prisma.stock.update({
      where: {
        storeId: storeId,
        id: stockId,
      },
      data: {
        quantity: {
          increment: quantity,
        },
      },
    });

    return product;
  }

  async countingProducts(storeId: string) {
    const customProducts = await prisma.stock.count({
      where: {
        storeId,
      },
    });

    return customProducts;
  }

  async updateStockItem(
    stockId: string,
    updateData: Partial<{
      status: string;
      quantity: number;
      customPrice: number;
      normalPrice: number;
      suggestedPrice: number;
    }>
  ) {
    return await prisma.stock.update({
      where: { id: stockId },
      data: updateData,
    });
  }
}
