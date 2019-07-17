import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PrvUserServiceService } from './prv-user-service.service';
import { Bill } from './shared/bill.model';
import { Router } from '@angular/router';


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
  uid: String;

  constructor(private http: HttpClient, private prvUserService: PrvUserServiceService,
    private router: Router) {

  }

  setUID(uid) {
    this.uid = uid;
  }

  getAllBills() {
    this.uid = this.prvUserService.getUID();
    this.http
      .get<{ bills: Bill[] }>("http://localhost:3000/api/prvusers/" + this.uid + "/bills")
      .subscribe(responseData => {
        this.bills = responseData.bills;
      });
    return this.bills;
  }
  getUnpayedBills() {
    this.uid = this.prvUserService.getUID();
    const headers = new HttpHeaders().set("status", "0");
    this.http
      .get<{ bills: Bill[] }>("http://localhost:3000/api/prvusers/" + this.uid + "/bills", { headers })
      .subscribe(responseData => {
        this.bills = responseData.bills;
      });
    return this.bills;
  }
}
