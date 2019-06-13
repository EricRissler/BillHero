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
    new Bill(20191589, "Media Markt", "05.08.2019", 900),
    new Bill(20195848, "Schreiner", "14.06.2019", 750),
    new Bill(20198512, "Zahnarzt", "24.12.2019", 750),
    new Bill(20195488, "MEWA", "01.01.2020", 750),
    new Bill(20198758, "Lidl", "27.03.2020", 750)
  ];

  // test = new Array(10, 20, 54, 48, 87);

  billcount = this.bill.length;

  user: string = "Thomas";

  constructor() {}

  ngOnInit() {}
}
