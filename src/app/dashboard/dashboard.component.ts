import { Component, OnInit } from "@angular/core";
import { Bill } from "../shared/bill.model";
import { HeaderService } from "../header.service";
import { PrvUserServiceService } from "../prv-user-service.service";
import { Router } from "@angular/router";
import { BillService } from "../bill.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

declare var require: any;
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  private Billy = require("../../assets/img/Billy.png");

  bill: Bill[];

  // test = new Array(10, 20, 54, 48, 87);

  nameFavPayOne: string;
  nameFavPayTwo: string;

  billcount: number;
  firstname: string;
  showMessage: boolean = false;
  uid: String;
  constructor(
    private headerService: HeaderService,
    private prvUserService: PrvUserServiceService,
    private billService: BillService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.prvUserService.getUser()) {
      this.router.navigate(["/signin"]);
    }
    this.headerService.setHeader(true);
    this.firstname = this.prvUserService.getUser();
    
   
    //this.bill=this.billService.getUnpayedBills();
    this.getUnpayed();

    if (this.bill == null) {
      this.getUnpayed();
    }

    this.nameFavPayOne = this.prvUserService.getNamePayOne();
    this.nameFavPayTwo = this.prvUserService.getNamePayTwo();
    console.log("Favone" + this.nameFavPayOne);
  }

  getUnpayed() {
    this.uid = this.prvUserService.getUID();
    const headers = new HttpHeaders().set("status", "0");
    this.http
      .get<{ bills: Bill[] }>(
        "http://localhost:3000/api/prvusers/" + this.uid + "/bills",
        { headers }
      )
      .subscribe(responseData => {
        this.bill = responseData.bills;
        this.billcount = this.bill.length;
      });
  }
  onPayStandard() {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 2000);
  }
}
