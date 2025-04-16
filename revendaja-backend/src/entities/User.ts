import { Store } from "./Store";

export class User {
  id?: string;
  name: string;
  secondName: string;
  email: string;
  emailVerified?: Date;
  status?: string;
  expoToken?: string;
  verificationCode?: string;
  image?: string;
  password: string;
  stripeCustomerId: string;
  plan?: string;
  lastPayment?: Date; // Armazenar a senha criptografada
  role?: string;
  stores?: Store[];

  constructor(
    id: string,
    email: string,
    role: string,
    stripeCustomerId: string,
    name?: string,
    secondName?: string,
    emailVerified?: Date,
    status?: string,
    expoToken?: string,
    verificationCode?: string,
    image?: string,
    password?: string,
    plan?: string,
    lastPayment?: Date
  ) {
    this.id = id;
    this.plan = plan;
    this.lastPayment = lastPayment;
    this.email = email;
    this.secondName = secondName;
    this.role = role;
    this.name = name;
    this.stripeCustomerId = stripeCustomerId;
    this.emailVerified = emailVerified;
    this.status = status;
    this.expoToken = expoToken;
    this.verificationCode = verificationCode;
    this.image = image;
    this.password = password;
    this.stores = [];
  }
}
