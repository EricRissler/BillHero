import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PrvUserServiceService } from "./prv-user-service.service";
import { Bill } from "./shared/bill.model";

@Injectable({
  providedIn: "root"
})
export class BillService {
  billID: String;
  billNr: String;
  creditorID: String;
  debitorID: String;
  payStatus: boolean;
  amount: number;
  deadline: String;
  categoryID: String;
  paymentId: String;
  shortname: String;
  bills: Bill[];
  bill: Bill[];
  uid: String;
  constructor(
    private http: HttpClient,
    private prvUserService: PrvUserServiceService
  ) {
    // this.uid = prvUserService.getUID();
  }

  getAllBills() {
    this.uid = "117248c0-a295-11e9";
    this.http
      .get<{ bills: Bill[] }>(
        "http://localhost:3000/api/prvusers/" + this.uid + "/bills"
      )
      .subscribe(responseData => {
        //alert(responseData.bills);
        // responseData.forEach(element => {
        //  this.bills=responseData.bills;
        // });
        // this.billID = responseData.billID;
        this.bills = responseData.bills;
        console.log(this.bills[0]);

        // console.log(responseData.bill[0]);
        // console.log(responseData.bill[1]);
      });
    this.bills.forEach(element => {
      alert(element.name);
      //this.bill.push(new Bill("Media", "05.08.2019", 900, false));
    });
    return this.bills;
  }
}
