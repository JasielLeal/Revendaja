import { Stock } from "./Stock";
import { User } from "./User";

export class Store {
  id?: string;
  name: string;
  subdomain: string;
  description?: string;
  numberPhone: string;
  status: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: User;
  stock?: Stock[];

  constructor(
    id: string,
    name: string,
    subdomain: string,
    status: string = "Ativa",
    numberPhone: string,
    userId?: string,
    description?: string,
    createdAt?: Date,
    updatedAt?: Date,
    user?: User,
    stock?: Stock[]
  ) {
    this.id = id;
    this.name = name;
    this.subdomain = subdomain;
    this.status = status;
    this.numberPhone = numberPhone;
    this.description = description;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
    this.stock = stock;
  }
}
