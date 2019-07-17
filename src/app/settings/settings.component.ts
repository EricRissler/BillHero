import { Component, OnInit } from "@angular/core";
import { HeaderService } from "../header.service";
import { PrvUserServiceService } from "../prv-user-service.service";
import { Router } from "@angular/router";
import { PaymentService } from "../payment.service";
import { HttpClient } from "@angular/common/http";
import { Payment } from "../shared/Payment.model";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  payment1: string = "Methode 1";
  payment2: string = "Methode 2";

  userID: string;

  payments: Payment[];

  togglePayment1() {
    this.payment1 = "";
  }

  togglePayment2() {
    this.payment2 = "";
  }

  constructor(
    private headerService: HeaderService,
    private prvUserService: PrvUserServiceService,
    private paymentService: PaymentService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.prvUserService.getUser()) {
      this.router.navigate(["/signin"]);
    }
    this.headerService.setHeader(true);
    this.userID = this.prvUserService.getUID();
    this.payments = this.paymentService.getPayments();
    if (this.payments == null) {
      this.http
        .get<{ payment: Payment[] }>(
          "http://localhost:3000/api/prvusers/" + this.userID + "/payments"
        )
        .subscribe(responseData => {
          console.log("YAY");
          console.log(responseData);

          this.payments = responseData.payment;
        });
    }
  }
}
