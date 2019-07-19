import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PrvUserServiceService } from "./prv-user-service.service";
import { Payment } from "./shared/Payment.model";
import { Prvuser } from "./shared/prvuser.model";

@Injectable({
  providedIn: "root"
})
export class PaymentService {
  userID: string;
  payments: Payment[];
  
  constructor(
    private http: HttpClient,
    private prvUserHeader: PrvUserServiceService
  ) {}

 

  getPayments() {
    this.userID = this.prvUserHeader.getUID();
    this.http
      .get<{ payment: Payment[] }>(
        "http://localhost:3000/api/prvusers/" + this.userID + "/payments"
      )
      .subscribe(responseData => {
        this.payments = responseData.payment;
      });

    return this.payments;
  }

  putPayments(idfavPayOne: string, idfavPayTwo: string) {
    this.userID = this.prvUserHeader.getUID();
    this.http
      .put<{ prvUser: Prvuser }>(
        "http://localhost:3000/api/prvusers/" + this.userID,
        {
          IDfavPaymentOne: idfavPayOne,
          IDfavPaymentTwo: idfavPayTwo
        }
      )
      .subscribe(responceData => {});
  }
}
