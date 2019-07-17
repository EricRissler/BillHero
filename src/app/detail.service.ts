import { Injectable } from '@angular/core';
import { Item } from './shared/item.model';
import { HttpClient } from '@angular/common/http';
import { PrvUserServiceService } from './prv-user-service.service';
import { Bill } from './shared/bill.model';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

    public items:Item[];
    public bill: Bill;
    public price:String;
    public uid:String;
    public shortname:String;
  constructor(private http: HttpClient, private prvUserService: PrvUserServiceService) { }

getDetail(id: String){
  this.uid = this.prvUserService.getUID();
  
  this.http
  .get<{ bill: Bill, items:Item[] }>("http://localhost:3000/api/prvusers/" + this.uid + "/bills/"+id)
  .subscribe(responseData => {
    console.log(responseData);
    this.price = responseData.bill.amount;
    this.shortname = responseData.bill.shortname;
    this.items = responseData.items;
    console.log(this.items);
   // console.log(this.bill);
  });
   // this.items = this.bill.items;
    //console.log(this.bill.items);
}

getItems(){
  return this.items;
}
getPrice(){
  return this.price;
}
getShortname(){
  return this.shortname;
}

}
