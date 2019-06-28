import { Component, OnInit } from "@angular/core";

declare var require: any;

@Component({
  selector: "app-paypal",
  templateUrl: "./paypal.component.html",
  styleUrls: ["./paypal.component.css"]
})
export class PaypalComponent implements OnInit {
  private payPal = require("../../assets/img/payPalIMG.png");
  constructor() {}

  ngOnInit() {}
}
