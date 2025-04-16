import { Product } from "@/entities/Product";

export interface ProductsRepository {
  create(data: Product): Promise<Product | null>;
  findById(id: string): Promise<Product | null>;
  findByBarcode(barcode: string): Promise<Product | null>;
  getAll(
    page: number,
    pageSize: number,
    search?: string,
    filter?: string
  ): Promise<{
    items: Product[] | null;
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }>;
}
