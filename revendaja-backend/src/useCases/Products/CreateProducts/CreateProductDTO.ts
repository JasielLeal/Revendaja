export interface CreateProductsDTO {
  id?: string;
  name: string;
  normalPrice: number;
  suggestedPrice: number;
  barcode?: string;
  imgUrl?: string;
  brand?: string;
  company?: string;
  category: string,
}
