export class Expenses {
  public readonly id?: string;
  public name: string;
  public description: string;
  public value: number;
  public readonly createdAt?: Date;
  public storeId: string;

  constructor(
    props: Omit<Expenses, "id" | "createdAt">,
    id?: string,
    createdAt?: Date
  ) {
    this.id = id || crypto.randomUUID();
    this.name = props.name;
    this.description = props.description;
    this.value = props.value;
    this.storeId = props.storeId;
    this.createdAt = createdAt || new Date();
  }
}
