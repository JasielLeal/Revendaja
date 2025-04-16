export interface CreateCustomProductDTO {
  name: string;
  normalPrice: number;
  barcode: string;
  suggestedPrice: number;
  imgUrl?: string;
  brand?: string;
  quantity?: number; // Pode manter como "Personalizado" por padrão
  userId: string;
  category?: string;
}
