import { Component, OnInit } from "@angular/core";
import { Bill } from "../shared/bill.model";
import { HeaderService } from "../header.service";
import { PrvUserServiceService } from "../prv-user-service.service";
import { Router } from "@angular/router";

declare var require: any;
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  private Billy = require("../../assets/img/Billy.png");

  bill: Bill[] = [
    new Bill("Media Markt", "05.08.2019", "900", 0),
    new Bill("Schreiner", "14.06.2019", "72350", 0),
    new Bill("Zahnarzt", "24.12.2019", "750", 0),
    new Bill("MEWA", "01.01.2020", "750", 0),
    new Bill("BillHero", "01.01.2020", "123750", 0),
    new Bill("Media Markt", "05.08.2019", "900", 0),
    new Bill("Schreiner", "14.06.2019", "72350", 0),
    new Bill("Zahnarzt", "24.12.2019", "750", 0)
  ];

  // test = new Array(10, 20, 54, 48, 87);

  // billcount = this.bill.length;
  firstname: string;
  showMessage: boolean = false;
  constructor(
    private headerService: HeaderService,
    private prvUserService: PrvUserServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.prvUserService.getUser()) {
      this.router.navigate(["/signin"]);
    }
    this.headerService.setHeader(true);
    this.firstname = this.prvUserService.getUser();
    console.log("Ich bin de User:" + this.firstname);
  }
  onPayStandard() {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 2000);
  }
}
