export class Item {
  public id:String;
  public billID:String;
  public itemName: string;
  public itemPrice: number;
  public itemAmount: number;
  constructor(item: string, price: number, amount:number) {
    this.itemName=item;
    this.itemPrice=price;
    this.itemAmount=amount;
  }
}
