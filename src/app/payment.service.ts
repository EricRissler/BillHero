import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PrvUserServiceService } from "./prv-user.service";

@Injectable({
  providedIn: "root"
})
export class PaymentService {
  userID: string;

  constructor(
    private http: HttpClient,
    private prvUserHeader: PrvUserServiceService
  ) {
    this.userID = prvUserHeader.getUID();
  }

  payments: string[];

  getPayments() {
    //TODO: Prüfen dass pw und user kein ':' enthält

    this.http
      .get<{ payment: string[] }>(
        "http://localhost:3000/api/prvusers/" + this.userID + "/payments"
      )
      .subscribe(responseData => {
        console.log("YAY");
        console.log(responseData);

        this.payments = responseData.payment;
      });

    return this.payments;
  }
}
