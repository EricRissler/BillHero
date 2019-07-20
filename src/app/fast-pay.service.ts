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
  message:String;
  constructor(private http: HttpClient) { }


  fastPay(idPayed:String, uid:String, billID:String){//idPayed:String
    //this.idPayed="bc0b1500-a8e9-11e9";
    this.http
    //.put<{}>("http://localhost:3000/api/prvusers/bc7b6300-a8e9-11e9/bills/48f30310-a8ea-11e9"
    .put<{message:String}>("http://localhost:3000/api/prvusers/"+uid+"/bills/"+billID,{
      paymentID: idPayed
    })
    .subscribe(message => {
      console.log(message);
      this.message = message.message;
    });
    return this.message;
  }

}
