export class RoleLimits {
  id?: string;
  role: string;
  customProductLimit: number;
  stockLimit: number;
  saleLimit: number;
  bankSlipLimit: number;
  storeLimit: number;

  constructor(
    role: string,
    customProductLimit: number,
    stockLimit: number,
    saleLimit: number,
    bankSlipLimit: number,
    storeLimit: number,
    id?: string
  ) {
    (this.role = role),
      (this.customProductLimit = customProductLimit),
      (this.stockLimit = stockLimit),
      (this.saleLimit = saleLimit),
      (this.bankSlipLimit = bankSlipLimit),
      (this.storeLimit = storeLimit),
      (this.id = id);
  }
}
