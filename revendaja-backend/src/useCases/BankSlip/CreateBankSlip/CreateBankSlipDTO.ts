export interface CreateBankSlipDTO {
  id?: string;
  userId: string;
  companyName: string;
  barcode: string;
  value: number;
  dueDate: Date;
}
