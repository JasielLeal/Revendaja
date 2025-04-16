import { BankSlip } from "@/entities/BankSlip";

export interface BankSlipRepository {
  create(data: BankSlip): Promise<BankSlip | null>;
  listAllByStore(
    storeId: string,
    page: Number,
    pageSize: number,
    companyName: string
  ): Promise<{
    currentPage: number;
    totalPages: number;
    bankSlips: BankSlip[];
  }>;
  findByBarcode(barcode: string): Promise<BankSlip | null>;
  findById(id: string): Promise<BankSlip | null>;
  deleteById(id: string, storeId: string): Promise<BankSlip | null>;
  checkValidity(storeId: string);
}
