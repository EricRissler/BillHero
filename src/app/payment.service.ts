import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PrvUserServiceService } from "./prv-user-service.service";
import { Payment } from "./shared/Payment.model";

@Injectable({
  providedIn: "root"
})
export class PaymentService {
  userID: string;

  constructor(
    private http: HttpClient,
    private prvUserHeader: PrvUserServiceService
  ) {}

  payments: Payment[];

  getPayments() {
    //TODO: Prüfen dass pw und user kein ':' enthält
    this.userID = this.prvUserHeader.getUID();
    this.http
      .get<{ payment: Payment[] }>(
        "http://localhost:3000/api/prvusers/" + this.userID + "/payments"
      )
      .subscribe(responseData => {
        console.log("YAY");
        console.log(responseData);

        this.payments = responseData.payment;
      });

    return this.payments;
  }

  putPayments(idfavPayOne: string, idfavPayTwo: string) {
    this.userID = this.prvUserHeader.getUID();
    this.http
      .put<{ message: string }>(
        "http://localhost:3000/api/prvusers/" + this.userID + "/payments",
        {
          IDfavPaymentOne: idfavPayOne,
          IDfavPaymentTwo: idfavPayTwo
        }
      )
      .subscribe(responceData => {});
  }
}
