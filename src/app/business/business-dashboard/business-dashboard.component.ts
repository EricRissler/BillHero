import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-business-dashboard",
  templateUrl: "./business-dashboard.component.html",
  styleUrls: ["./business-dashboard.component.css"]
})
export class BusinessDashboardComponent implements OnInit {
  userID: string;
  billnr: string;
  product1: string;
  product2: string;
  product3: string;
  quantity1: number=0;
  quantity2: number=0;
  quantity3: number=0;
  price1: number=0;
  price2: number=0;
  price3: number=0;
  deadline: string;
  Endprice: number = 0;

  constructor() {}

  ngOnInit() {}

  calculatePrice() {
    this.Endprice =
      this.price1 * this.quantity1 +
      this.price2 * this.quantity2 +
      this.price3 * this.quantity3;
  }
}
