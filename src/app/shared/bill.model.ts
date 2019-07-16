export class Bill {
  // public name: string;
  // public deadline: string;
  // public price: string;
  // public status: boolean;
  public billID: String;
  public billNr: String;
  public creditorID: String;
  public debitorID: String;
  public payStatus: boolean;
  public amount: number;
  public deadline: String;
  public categoryID: String;
  public paymentId: String;
  public shortname: String;
  constructor(
    public name: string, public deadlineTEST: string, public price: number, public status: boolean, ) {
    this.shortname = name;
    this.deadline = deadlineTEST;
    this.amount = price;
    this.payStatus = status;
  }
}
