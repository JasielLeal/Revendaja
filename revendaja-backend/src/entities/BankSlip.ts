import { Store } from "./Store"; // Importa a entidade Store, se existir

export class BankSlip {
  id?: string;
  storeId: string;
  store?: Store | null;
  companyName: string;
  barcode: string;
  value: number;
  dueDate: Date;

  constructor(
    id: string,
    storeId: string,
    companyName: string,
    barcode: string,
    value: number,
    dueDate: Date,
    store?: Store
  ) {
    this.id = id;
    this.storeId = storeId;
    this.companyName = companyName;
    this.barcode = barcode;
    this.value = value;
    this.dueDate = dueDate;
    this.store = store ?? null;
  }

  // Método para validar o boleto (se necessário)
 
}
