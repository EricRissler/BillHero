import { Component, OnInit} from "@angular/core";
import { Bill } from "../shared/bill.model";
import { HeaderService } from '../header.service';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var require: any;
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  private Billy = require("../../assets/img/Billy.png");

  bill: Bill[] = [
    new Bill("Media Markt", "05.08.2019", "900", false),
    new Bill("Schreiner", "14.06.2019", "72350", false),
    new Bill("Zahnarzt", "24.12.2019", "750", false),
    new Bill("MEWA", "01.01.2020", "750", false),
    new Bill("BillHero", "01.01.2020", "123750", false),
    new Bill("Media Markt", "05.08.2019", "900", false),
    new Bill("Schreiner", "14.06.2019", "72350", false),
    new Bill("Zahnarzt", "24.12.2019", "750", false),
  ];

  // test = new Array(10, 20, 54, 48, 87);

  billcount = this.bill.length;

  user: string = "Thomas";

  constructor(private headerService: HeaderService, public snack: MatSnackBar) {}

  ngOnInit() {
    this.headerService.setHeader(true);
  }
  onPayStandard(){
     // this.snack.open("Deine Rechnung wurde bezahlt","OK", {
     //   duration:1000,
     //   horizontalPosition:"end",
     // });
     
    }
  
}
