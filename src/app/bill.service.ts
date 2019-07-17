import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  bill: Bill[];

  b: Bill;
  uid: String;

  constructor(private http: HttpClient, private prvUserService: PrvUserServiceService,
    private router: Router) {

  }

  setUID(uid) {
    this.uid = uid;
  }

  getAllBills() {
    //this.uid="3ff9d230-a7ef-11e9";
    // this.uid = uid;
    this.uid = this.prvUserService.getUID();
    //alert(this.uid);
    //  const uid2 = this.uid;
    this.http
      .get<{ bills: Bill[] }>("http://localhost:3000/api/prvusers/" + this.uid + "/bills")
      // .get<{ bills: Bill[] }>("http://localhost:3000/api/prvusers/3ff9d230-a7ef-11e9/bills")

      .subscribe(responseData => {
        //alert(responseData.bills);
        // responseData.forEach(element => {
        //  this.bills=responseData.bills;
        // });
        // this.billID = responseData.billID;
        this.bills = responseData.bills;


        //console.log(responseData.bills[0].payStatus);
        // console.log(responseData.bill[1]);
      });

    // this.bills.forEach(element => {
    //alert(element.shortname+" "+ element.deadline +" "+element.amount);
    // new Bill(element.shortname, element.deadline, element.amount, false)
    //this.bill.push(this.b);
    //  });
    //  this.bill.forEach(element => {
    //    alert(element.shortname);
    //  });
        
    return this.bills;
  }
}
