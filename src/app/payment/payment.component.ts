import { Component, OnInit } from '@angular/core';

declare var require: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  private payPal = require("../../assets/img/payPalIMG.png");
  private instantTransfer = require("../../assets/img/instantTransferIMG.svg.png");
  private creditcard = require("../../assets/img/creditcardIMG.png");
  constructor() { }

  ngOnInit() {
  }

}
