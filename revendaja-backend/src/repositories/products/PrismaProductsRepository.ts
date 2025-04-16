import { Product } from "@/entities/Product";
import { ProductsRepository } from "./ProductsRepository";
import { prisma } from "@/lib/prisma";

export class PrismaProductsRepository implements ProductsRepository {
  async create(data: Product): Promise<Product | null> {

    const product = await prisma.product.create({
      data: {
        name: data.name,
        brand: data.brand,
        company: data.company,
        normalPrice: Number(data.normalPrice),
        suggestedPrice: Number(data.suggestedPrice),
        imgUrl: data.imgUrl,
        barcode: data.barcode,
        category: data.category
      },
    });

    return product;
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    return product;
  }

  async findByBarcode(barcode: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: {
        barcode,
      },
    });

    return product;
  }

  async getAll(
    page: number = 1,
    pageSize: number = 5,
    search: string,
    filter?: string // Tornar search opcional
  ): Promise<{
    items: Product[] | null;
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }> {
    const totalProducts = await prisma.product.count();

    const totalPages = Math.ceil(totalProducts / pageSize);

    const where: any = {};

    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (filter && filter !== "todas") {
      where.company = {
        contains: filter,
        mode: "insensitive",
      };
    }
    // Aplicar o filtro condicionalmente se `search` estiver definido
    const stockProducts = await prisma.product.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize, // Certifique-se de que pageSize é um número
    });

    return {
      currentPage: page,
      totalItems: totalProducts,
      totalPages,
      items: stockProducts,
    };
  }
}
