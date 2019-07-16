import { Component, OnInit } from "@angular/core";
import { HeaderService } from "../header.service";
import { PrvUserServiceService } from '../prv-user-service.service';
import { Router } from '@angular/router';

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

  constructor(private headerService: HeaderService,private prvUserService: PrvUserServiceService,
    private router: Router) {}

  ngOnInit() {
    if(!this.prvUserService.getUser()){
      this.router.navigate(["/signin"]);
    }
    this.headerService.setHeader(true);
  }
}
