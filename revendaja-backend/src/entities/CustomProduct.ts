import { Stock } from "./Stock";

export class CustomProduct {
  id?: string;
  name: string;
  normalPrice: number;
  suggestedPrice: number;
  barcode?: string;
  imgUrl?: string;
  brand?: string;
  company?: string;
  quantity?: number;
  category?: string;
  // Pode manter como "Personalizado" por padrão
  storeId: string; // Identificador da loja
  createdAt?: Date;
  updatedAt?: Date;
  stock?: Stock[];

  constructor(
    id: string,
    name: string,
    normalPrice: number,
    suggestedPrice: number,
    barcode: string,
    storeId: string,
    category?: string,
    imgUrl?: string,
    brand?: string,
    company?: string,
    quantity?: number,
    createdAt?: Date,
    updatedAt?: Date,
    stock?: Stock[]
  ) {
    this.id = id;
    this.name = name;
    this.normalPrice = normalPrice;
    this.suggestedPrice = suggestedPrice;
    this.barcode = barcode;
    this.imgUrl = imgUrl;
    this.category = category;
    this.brand = brand || "Personalizado";
    this.company = company
    this.quantity = quantity; // Marca "Personalizado" por padrão
    this.storeId = storeId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.stock = stock;
  }
}
