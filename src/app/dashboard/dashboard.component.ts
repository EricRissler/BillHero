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
    new Bill("Media Markt", 2019, 900),
    new Bill("Schreiner", 2019, 750),
    new Bill("Zahnarzt", 2019, 750)
  ];

  billcount = Bill.length;
  constructor() {}

  ngOnInit() {}
}
