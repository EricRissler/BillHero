import { Component, OnInit } from "@angular/core";
import { Bill } from "../shared/bill.model";
declare var require: any;
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  private Billy = require("../../assets/img/Billy.png");

  bill: Bill[] = [
    new Bill("Media Markt", "05.08.2019", 900, true),
    new Bill("Schreiner", "14.06.2019", 750, true),
    new Bill("Zahnarzt", "24.12.2019", 750, false),
    new Bill("MEWA", "01.01.2020", 750, true),
    

  ];

  // test = new Array(10, 20, 54, 48, 87);

  billcount = this.bill.length;

  user: string = "Thomas";

  constructor() {}

  ngOnInit() {}
}
