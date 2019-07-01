import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/header.service';
declare var require: any;
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  private payPal = require("../../../assets/img/payPalIMG.png");
  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.setHeader(true);
  }

}
