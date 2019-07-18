import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/header.service';
import { Router } from '@angular/router';
import { PrvUserServiceService } from 'src/app/prv-user-service.service';
import { DetailService } from 'src/app/detail.service';
import { HttpClient } from '@angular/common/http';
declare var require: any;
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  private payPal = require("../../../assets/img/payPalIMG.png");
  billID: String;
  uid: string;
  message: String;
  
  constructor(private headerService: HeaderService, private router: Router,
    private prvUserService: PrvUserServiceService,
    private detailService: DetailService,
    private http: HttpClient) { }

  ngOnInit() {
    this.headerService.setHeader(true);

  }

  onPay(){
    this.billID = this.detailService.getID();
    this.uid = this.prvUserService.getUID();
    
      this.router.navigate(["/paypal"]);
      this.http
      .put<{message:String}>("http://localhost:3000/api/prvusers/"+this.uid+"/bills/"+this.billID,{
        paymentID: "paypal"
      })
      .subscribe(message => {
        this.message = message.message;
      });
      if(this.message == "Payment succeeded") {
        this.router.navigate(["/payed"]);
      }
  }

}
