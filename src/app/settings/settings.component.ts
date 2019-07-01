import { Component, OnInit } from "@angular/core";
import { HeaderService } from '../header.service';

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  constructor(private headerService: HeaderService) {}

<<<<<<< HEAD
  payment1: string = "Methode 1";
  payment2: string = "Methode 2";

  payment: string[] = ["MasterCard", "Visa", "Sofort"];

  togglePayment1() {
    this.payment1 = "";
  }

  togglePayment2() {
    this.payment2 = "";
  }

  ngOnInit() {}
=======
  ngOnInit() {
    this.headerService.setHeader(true);
  }
>>>>>>> 67e9fb28e028214a41043a022d2ff227db66b4fe
}
