<<<<<<< HEAD:src/app/payment/paypal/paypal.component.ts
import { Component, OnInit } from '@angular/core';
declare var require: any;
=======
import { Component, OnInit } from "@angular/core";

declare var require: any;

>>>>>>> 4282eda12a481b587c70a24b931a008376d81fa8:src/app/paypal/paypal.component.ts
@Component({
  selector: "app-paypal",
  templateUrl: "./paypal.component.html",
  styleUrls: ["./paypal.component.css"]
})
export class PaypalComponent implements OnInit {
<<<<<<< HEAD:src/app/payment/paypal/paypal.component.ts
  private payPal = require("../../../assets/img/payPalIMG.png");
  constructor() { }

  ngOnInit() {
  }
=======
  private payPal = require("../../assets/img/payPalIMG.png");
  constructor() {}
>>>>>>> 4282eda12a481b587c70a24b931a008376d81fa8:src/app/paypal/paypal.component.ts

  ngOnInit() {}
}
