export interface CreateRoleLimitDTO {
  id?: string;
  role: string;
  customProductLimit: number;
  stockLimit: number;
  saleLimit: number;
  bankSlipLimit: number;
  storeLimit: number;
}
