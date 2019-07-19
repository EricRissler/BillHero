import { Component, OnInit } from "@angular/core";
import { Bill } from "../shared/bill.model";
import { HeaderService } from "../header.service";
import { PrvUserServiceService } from "../prv-user-service.service";
import { Router } from "@angular/router";
import { BillService } from "../bill.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FastPayService } from '../fast-pay.service';

declare var require: any;
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  private Billy = require("../../assets/img/Billy.png");

  bill: Bill[];

  nameFavPayOne: string;
  nameFavPayTwo: string;

  billcount = 0;
  firstname: string;
  showMessage: boolean = false;
  uid: String;
  message: String;
  constructor(
    private headerService: HeaderService,
    private prvUserService: PrvUserServiceService,
    private billService: BillService,
    private http: HttpClient,
    private fastPay: FastPayService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.prvUserService.getUser()) {
      this.router.navigate(["/signin"]);
    }
    this.headerService.setHeader(true);
    this.firstname = this.prvUserService.getUser();

    this.getUnpayed();

    if (this.bill == null) {
      this.getUnpayed();
    }

    this.nameFavPayOne = this.prvUserService.getNamePayOne();
    this.nameFavPayTwo = this.prvUserService.getNamePayTwo();
  }

  getUnpayed() {
    this.uid = this.prvUserService.getUID();
    const headers = new HttpHeaders().set("status", "0");
    this.http.get<{ bills: Bill[] }>("http://localhost:3000/api/prvusers/" + this.uid + "/bills", { headers })
      .subscribe(responseData => {
        this.bill = responseData.bills;
        this.billcount = this.bill.length;
      });
  }
  onPayStandard(billID: String) {

    this.message = this.fastPay.fastPay(this.prvUserService.getIDPayOne(), this.uid, billID);
    if (this.message == "Payment succeeded") {
      for (let index = 0; index < this.bill.length; index++) {
        if (this.bill[index].id == billID) {
          this.bill.splice(index, 1);
          this.billcount = this.bill.length;
        }
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 2000);
      }


    }
  }
  onAlternativePay(billID: String) {
    this.message = this.fastPay.fastPay(this.prvUserService.getIDPayTwo(), this.uid, billID);
    if (this.message == "Payment succeeded") {
      for (let index = 0; index < this.bill.length; index++) {
        if (this.bill[index].id == billID) {
          this.bill.splice(index, 1);
          this.billcount = this.bill.length;
        }
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 2000);

      }
    }
  }
}
