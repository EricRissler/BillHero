import { Item } from './item.model';

export class Bill {
  // public name: string;
  // public deadline: string;
  // public price: string;
  // public status: boolean;
  public billID: String;
  public billNr: String;
  public creditorID: String;
  public debitorID: String;
  public paymentStatus: number;
  public amount: String;
  public deadline: String;
  public categoryID: String;
  public paymentId: String;
  public shortname: String;
  public items: Item[];
  public id: String;
  constructor(
    public name: String, public deadlineTEST: String, public price: String, public status: number) {
    this.shortname = name;
    this.deadline = deadlineTEST;
    this.amount = price;
    this.paymentStatus = status;
  }
}
