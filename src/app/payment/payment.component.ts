import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HeaderService } from "../header.service";
import { PrvUserServiceService } from "../prv-user-service.service";
import { DetailService } from '../detail.service';
import { HttpClient } from '@angular/common/http';
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
  price:String;
  billID: String;
  message:String;
  uid: string;
  constructor(
    private router: Router,
    private prvUserService: PrvUserServiceService,
    private headerService: HeaderService,private detailService: DetailService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    if (!this.prvUserService.getUser()) {
      this.router.navigate(["/signin"]);
    }

    this.headerService.setHeader(true);
    this.price=this.detailService.getPrice();
  }

  btnClick() {
    this.billID = this.detailService.getID();
    this.uid = this.prvUserService.getUID();
    if (this.paypalCheck) {
      this.router.navigate(["/paypal"]);
      //-------------------------------------------------------------------------------
    } else if(this.intantCheck) {
      this.http
      .put<{message:String}>("http://localhost:3000/api/prvusers/"+this.uid+"/bills/"+this.billID,{
        paymentID: "sepa"
      })
      .subscribe(message => {
        this.message = message.message;
      });
      if(this.message == "Payment succeeded") {
        this.router.navigate(["/payed"]);
        //---------------------------------------------------------------------------
      }
      
    }else if(this.creditcardCheck){
      
      this.http
      .put<{message:String}>("http://localhost:3000/api/prvusers/"+this.uid+"/bills/"+this.billID,{
        paymentID: "debitcard"
      })
      .subscribe(message => {
        this.message = message.message;
      });
      if(this.message == "Payment succeeded") {
        this.router.navigate(["/payed"]);
        //---------------------------------------------------------------------------
      }
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
