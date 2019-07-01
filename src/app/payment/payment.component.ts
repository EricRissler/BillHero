import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD

=======
import { Router } from '@angular/router';
import { HeaderService } from '../header.service';
>>>>>>> 67e9fb28e028214a41043a022d2ff227db66b4fe
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
<<<<<<< HEAD
  constructor() { }
=======

  paypalCheck=true;
  intantCheck=false;
  creditcardCheck=false;
  checkedValue:String;
  

  constructor(private router: Router, private headerService: HeaderService) { }
>>>>>>> 67e9fb28e028214a41043a022d2ff227db66b4fe

  ngOnInit() {
    this.headerService.setHeader(true);
  }

}
