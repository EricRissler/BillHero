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
  quantity1: number;
  quantity2: number;
  quantity3: number;
  price1: number;
  price2: number;
  price3: number;
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
