import { Component, OnInit } from "@angular/core";
import { HeaderService } from "../header.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  payment1: string = "Methode 1";
  payment2: string = "Methode 2";

  payment: string[] = ["MasterCard", "Visa", "Sofort"];

  togglePayment1() {
    this.payment1 = "";
  }

  togglePayment2() {
    this.payment2 = "";
  }

  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    this.headerService.setHeader(true);
  }
}
