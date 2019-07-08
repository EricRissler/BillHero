import { Component, OnInit } from "@angular/core";
import { Bill } from "../shared/bill.model";
import { Category } from "../shared/category.model";
import { HttpClient } from '@angular/common/http';
import { HeaderService } from '../header.service';

@Component({
  selector: "app-mybills",
  templateUrl: "./mybills.component.html",
  styleUrls: ["./mybills.component.css"]
})
export class MybillsComponent implements OnInit {
  category: Category[]=[
    new Category("Arzt"),
    new Category("Auto")
  ]    
  billCategory: string = "";
  constructor(private headerService: HeaderService,private http:HttpClient) { }
  public input: string = "";

   bill: Bill[] ;
   //= [
  //   new Bill("Media Markt", "05.08.2019", 900, false),
  //   new Bill("Schreiner", "14.06.2019", 750, false),
  //   new Bill("Zahnarzt", "24.12.2019", 750, false),
  //   new Bill("MEWA", "01.01.2020", 750, false),
  //   new Bill("Media Markt", "05.08.2019", 900, true),
  //   new Bill("Schreiner", "14.06.2019", 750, true),
  //   new Bill("Zahnarzt", "24.12.2019", 750, true),
  //   new Bill("MEWA", "01.01.2020", 750, false),
  //   new Bill("Media Markt", "05.08.2019", 900, true),
  //   new Bill("Schreiner", "14.06.2019", 750, true),
  //   new Bill("Zahnarzt", "24.12.2019", 750, true),
  //   new Bill("MEWA", "01.01.2020", 750, false),
  //   new Bill("Lidl", "27.03.2020", 750, false)
  // ];

  newCategory() {
    this.category.push((new Category(this.input)));
    this.input="";
  }



  ngOnInit() {
    this.headerService.setHeader(true);

    //  this.http.get<{bill:Bill[]}>('http://localhost:3000/api/mybills')
    //  .subscribe((billData) => {
       
    //    this.bill=billData.bill;
       
    //  });

      this.bill= [
          new Bill("Media Markt", "05.08.2019", "900", false),
         new Bill("Schreiner", "14.06.2019", "750", false),
          new Bill("Zahnarzt", "24.12.2019", "750", false),
         new Bill("MEWA", "01.01.2020", "750", false),
         new Bill("Media Markt", "05.08.2019", "900", true),
         new Bill("Schreiner", "14.06.2019", "750", true),
         new Bill("Media Markt", "05.08.2019", "900", true),
         new Bill("Schreiner", "14.06.2019", "750", true),
         new Bill("Zahnarzt", "24.12.2019", "750", true),
         
         ];

  }
}
