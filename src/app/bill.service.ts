import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PrvUserServiceService } from './prv-user-service.service';
import { Bill } from './shared/bill.model';

@Injectable({
  providedIn: 'root'
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
  shortname:String;
  bills:Bill[];

  uid: String;
  constructor(private http: HttpClient, private prvUserService: PrvUserServiceService) {
   // this.uid = prvUserService.getUID();
  }



  getAllBills() {
    this.uid="117248c0-a295-11e9";
    this.http
      .get<{bills:Bill[]}>("http://localhost:3000/api/prvusers/" + this.uid + "/bills")
      .subscribe(responseData => {
        alert("test");
      // responseData.forEach(element => {
       //  this.bills=responseData.bills;
      // });
       // this.billID = responseData.billID;
      console.log(responseData);
      });
  }

}
