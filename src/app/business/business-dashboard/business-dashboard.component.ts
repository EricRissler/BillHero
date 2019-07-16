import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ComUserService } from "src/app/com-user.service";

@Component({
  selector: "app-business-dashboard",
  templateUrl: "./business-dashboard.component.html",
  styleUrls: ["./business-dashboard.component.css"]
})
export class BusinessDashboardComponent implements OnInit {
  userID: string = "";
  billnr: string = "";
  product1: string = "";
  product2: string = "";
  product3: string = "";
  quantity1: number = 0;
  quantity2: number = 0;
  quantity3: number = 0;
  price1: number = 0;
  price2: number = 0;
  price3: number = 0;
  deadline: string = "";
  date: string = "";
  endprice: number = 0;
  comID: string;

  constructor(
    private http: HttpClient,
    private comUserService: ComUserService
  ) {
    this.comID = comUserService.getComID();
  }

  refreshInput() {
    this.userID = "";
    this.billnr = "";
    this.product1 = "";
    this.product2 = "";
    this.product3 = "";
    this.quantity1 = 0;
    this.quantity2 = 0;
    this.quantity3 = 0;
    this.price1 = 0;
    this.price2 = 0;
    this.price3 = 0;
    this.deadline = "";
    this.date = "";
    this.endprice = 0;
  }

  postBill() {
    console.log("Bin in Bill");
    this.http
      .post<{ message: String }>(
        "http://localhost:3000/api/comusers/" + this.comID + "/bills",
        {
          debID: this.userID,
          creID: this.comID,
          items: [
            (this.product1, this.price1, this.quantity1),
            (this.product2, this.price2, this.quantity2),
            (this.product3, this.price3, this.quantity3)
          ],
          amount: this.endprice,
          deadline: this.deadline,
          date: this.date,
          billNr: this.billnr
        }
      )
      .subscribe(responseData => {
        console.log(responseData.message);
        console.log(this.userID);
        console.log(this.userID);
      });

    this.refreshInput();
  }

  calcPrice() {
    this.endprice =
      this.price1 * this.quantity1 +
      this.price2 * this.quantity2 +
      this.price3 * this.quantity3;
  }

  ngOnInit() {}
}
