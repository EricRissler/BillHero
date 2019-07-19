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


  fastPay(idPayed:String, uid:String, billID:String){
    this.http
    .put<{message:String}>("http://localhost:3000/api/prvusers/"+uid+"/bills/"+billID,{
      paymentID: idPayed
    })
    .subscribe(message => {
      this.message = message.message;
    });
    return this.message;
  }

}
