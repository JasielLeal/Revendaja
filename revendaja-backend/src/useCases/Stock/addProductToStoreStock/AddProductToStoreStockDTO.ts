export interface AddProductToStoreStockDTO {
  userId: string;
  barcode: string;
  customPrice?: number;
  normalPrice?: number;
  suggestedPrice?: number;
  quantity?: number;
  category?: string;
}
