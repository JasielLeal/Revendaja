import { prisma } from "@/lib/prisma";
import { SaleRepository } from "./SaleRepository";
import {
  startOfDay,
  startOfMonth,
  endOfMonth,
  format,
  addHours,
  subMilliseconds,
} from "date-fns";

export class PrismaSaleRepository implements SaleRepository {
  async createSaleWithItems(
    saleItemsData: any[],
    totalPrice: number,
    storeId: string,
    customer: string,
    status: string,
    transactionType: string,
    numberPhone?: string
  ) {
    return await prisma.$transaction(async (prisma) => {
      const sale = await prisma.sale.create({
        data: {
          totalPrice,
          customer,
          transactionType,
          status,
          numberPhone,
          store: {
            connect: { id: storeId },
          },
          saleItems: {
            create: saleItemsData,
          },
        },
      });

      return sale;
    });
  }

  async getSalesByStore(
    storeId: string,
    month: string,
    search: string,
    page: number = 1,
    pageSize: number = 10
  ) {
    const year = new Date().getFullYear();
    const monthIndex = parseInt(month, 10) - 1;
    const selectedMonth = new Date(year, monthIndex, 1);

    const startDate = addHours(startOfMonth(selectedMonth), 3);
    const endDate = subMilliseconds(addHours(endOfMonth(selectedMonth), 3), 1);

    // Contagem total das vendas para calcular o total de páginas
    const totalSalesCount = await prisma.sale.count({
      where: {
        storeId,
        customer: {
          contains: search,
          mode: "insensitive",
        },
        status: "Approved",
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Calculando o total de páginas
    const totalPages = Math.ceil(totalSalesCount / 10);

    const sales = await prisma.sale.findMany({
      where: {
        storeId,
        customer: {
          contains: search,
          mode: "insensitive",
        },
        status: "Approved",
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      skip: (page - 1) * pageSize || 0,
      take: pageSize || 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        saleItems: {
          include: {
            stock: {
              include: {
                customProduct: true,
                product: true,
              },
            },
          },
        },
      },
    });

    const dailySales = sales.reduce((acc, sale) => {
      const day = format(addHours(startOfDay(sale.createdAt), 3), "yyyy-MM-dd");

      if (!acc[day]) {
        acc[day] = {
          day: addHours(startOfDay(sale.createdAt), 3),
          totalValue: 0,
          sales: [],
        };
      }

      acc[day].totalValue += Number(sale.totalPrice);
      acc[day].sales.push(sale);
      return acc;
    }, {} as Record<string, { day: Date; totalValue: number; sales: any[] }>);

    const result = Object.values(dailySales);

    return {
      currentPage: page,
      totalPages: totalPages,
      sales: result,
    };
  }

  async getLatestThreePurchases(storeId: string) {
    const lastSales = await prisma.sale.findMany({
      where: {
        storeId,
        status: "Approved",
      },
      include: {
        saleItems: {
          include: {
            stock: {
              include: {
                customProduct: true,
                product: true,
              },
            },
          },
        },
      },
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
    });

    return lastSales;
  }

  async calculateMonthlyBalance(storeId: string, month: string) {
    const year = new Date().getFullYear();
    const monthIndex = parseInt(month, 10) - 1;
    const selectedMonth = new Date(year, monthIndex, 1);

    const startDate = addHours(startOfMonth(selectedMonth), 3);
    const endDate = subMilliseconds(addHours(endOfMonth(selectedMonth), 3), 1);

    const sales = await prisma.sale.findMany({
      where: {
        storeId: storeId,
        status: "Approved",
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      select: {
        totalPrice: true,
      },
    });

    const monthlyBalance = sales.reduce(
      (acc, sale) => acc + Number(sale.totalPrice),
      0
    );
    return monthlyBalance.toString();
  }

  async deleteSale(storeId: string, saleId: string) {
    await prisma.sale.delete({
      where: {
        storeId,
        id: saleId,
      },
    });

    return;
  }

  async getTheTopBestSellingProducts(storeId: string): Promise<any[]> {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    interface ProductSales {
      productId: string;
      quantity: number;
      stock: any; // Incluindo o estoque completo
    }

    const sales = await prisma.sale.findMany({
      where: {
        storeId,
        status: "Approved",
        createdAt: {
          gte: startOfMonth(new Date(year, month - 1, 1)),
          lte: endOfMonth(new Date(year, month - 1, 1)),
        },
      },
      include: {
        saleItems: {
          include: {
            stock: {
              include: {
                customProduct: true,
                product: true,
              },
            },
          },
        },
      },
    });

    const productSales = sales
      .flatMap((sale) => sale.saleItems)
      .reduce((acc: { [key: string]: ProductSales }, saleItem) => {
        const productId =
          saleItem.stock.productId || saleItem.stock.customProductId;
        if (!acc[productId]) {
          acc[productId] = {
            productId,
            quantity: 0,
            stock: saleItem.stock, // Armazena o estoque completo
          };
        }
        acc[productId].quantity += saleItem.quantity;
        return acc;
      }, {});

    const topProducts = Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10)
      .map((item) => {
        const stock = item.stock;
        return {
          stock: {
            id: stock.id,
            quantity: stock.quantity,
            customPrice: stock.customPrice,
            suggestedPrice: stock.suggestedPrice,
            normalPrice: stock.normalPrice,
            category: stock.category,
            status: stock.status,
            discountValue: stock.discountValue,
            storeId: stock.storeId,
            productId: stock.productId,
            customProductId: stock.customProductId,
            updatedAt: stock.updatedAt,
            product: stock.product || null,
            customProduct: stock.customProduct || null,
          },
        };
      });

    return topProducts;
  }

  async getSalesPendingByStore(
    storeId: string,
    page: number = 1,
    pageSize: number = 10
  ) {
    const totalSalesCount = await prisma.sale.count({
      where: {
        storeId,
        status: "Pending",
      },
    });

    const totalPages = Math.ceil(totalSalesCount / 10);

    const sales = await prisma.sale.findMany({
      where: {
        storeId,
        status: "Pending",
      },
      include: {
        saleItems: {
          include: {
            stock: {
              include: {
                customProduct: true,
                product: true,
              },
            },
          },
        },
      },
      skip: (page - 1) * pageSize || 0,
      take: pageSize || 10,
      orderBy: {
        createdAt: "asc",
      },
    });

    return {
      currentPage: page,
      totalPages: totalPages,
      sales: sales,
    };
  }

  async findSaleById(id: string, storeId: string): Promise<any | null> {
    const sale = await prisma.sale.findUnique({
      where: {
        storeId,
        id,
      },
      include: {
        saleItems: {
          include: {
            stock: {
              include: {
                customProduct: true,
                product: true,
              },
            },
          },
        },
      },
    });

    return sale;
  }

  async updatedStatus(saleId: string): Promise<void> {
    await prisma.sale.update({
      where: {
        id: saleId,
      },
      data: {
        status: "Approved",
      },
    });

    return;
  }

  async bestSellingCompany(storeId: string) {
    const sales = await prisma.sale.findMany({
      where: {
        storeId,
        status: "Approved",
      },
      include: {
        saleItems: {
          include: {
            sale:{
              include:{
                saleItems: true
              }
            },
            stock:{
              include:{
                customProduct: true,
                product: true
              }
            }
          },
        },
      },
    });
  
  

    const companySalesMap: Record<string, number> = {};

    sales.forEach((sale) => {
      
      sale.saleItems.forEach((item) => {

        const product = item.stock?.product ?? item.stock?.customProduct;
          
        const companyName = product?.company;
        
        if (companyName) {
          companySalesMap[companyName] = (companySalesMap[companyName] || 0) + item.quantity;
        }
      });
    })
  
    return Object.entries(companySalesMap).map(([name, population]) => ({
      name,
      population,
  }));
  }

  async countSalesByDay(storeId: string): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    return await prisma.sale.count({
      where: {
        storeId,
        createdAt: {
          gte: today, // Contar todas as vendas a partir da meia-noite de hoje
        },
      },
    });
  }
  
}
