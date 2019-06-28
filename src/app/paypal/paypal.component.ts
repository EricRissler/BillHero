import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  private payPal = require("../../assets/img/payPalIMG.png");
  constructor() { }

  ngOnInit() {
  }

}
