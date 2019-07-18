import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bill } from './shared/bill.model';

@Injectable({
  providedIn: 'root'
})
export class FastPayService {

  uid:String;
  billID:String;
  idPayed:String;
  constructor(private http: HttpClient) { }


  fastPay(){//idPayed:String
    this.idPayed="bc0b1500-a8e9-11e9";
    this.http
    //.put<{}>("http://localhost:3000/api/prvusers/"+this.uid+"/bills/"+this.billID)
    .put<{}>("http://localhost:3000/api/prvusers/bc7b6300-a8e9-11e9/bills/48f30310-a8ea-11e9",{
      paymentID: this.idPayed
    })
    .subscribe(responseData => {
      alert("Test");
    });
  }

}
