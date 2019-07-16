import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HeaderService } from "../header.service";
import { PrvUserServiceService } from '../prv-user-service.service';
declare var require: any;
@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"]
})
export class PaymentComponent implements OnInit {
  private payPal = require("../../assets/img/payPalIMG.png");
  private instantTransfer = require("../../assets/img/instantTransferIMG.svg.png");
  private creditcard = require("../../assets/img/creditcardIMG.png");

  paypalCheck = true;
  intantCheck = false;
  creditcardCheck = false;
  checkedValue: String;

  constructor(private router: Router, private prvUserService: PrvUserServiceService, private headerService: HeaderService) {}

  ngOnInit() {

    if(!this.prvUserService.getUser()){
      this.router.navigate(["/signin"]);
    }

    this.headerService.setHeader(true);
  }

  btnClick() {
    if (this.paypalCheck) {
      this.router.navigate(["/paypal"]);
    } else {
      this.router.navigate(["/payed"]);
    }
  }

  check(value: String) {
    this.checkedValue = value;
    if (value == "paypal") {
      this.paypalCheck = true;
      this.intantCheck = false;
      this.creditcardCheck = false;
    } else if (value == "instant") {
      this.intantCheck = true;
      this.paypalCheck = false;
      this.creditcardCheck = false;
    } else if (value == "creditcard") {
      this.creditcardCheck = true;
      this.paypalCheck = false;
      this.intantCheck = false;
    }
  }
}
