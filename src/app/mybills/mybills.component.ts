import { Component, OnInit } from "@angular/core";
import { Bill } from "../shared/bill.model";
import { Category } from "../shared/category.model";
import { HttpClient } from "@angular/common/http";
import { HeaderService } from "../header.service";
import { PrvUserServiceService } from "../prv-user-service.service";
import { Router } from "@angular/router";
import { BillService } from "../bill.service";

@Component({
  selector: "app-mybills",
  templateUrl: "./mybills.component.html",
  styleUrls: ["./mybills.component.css"]
})
export class MybillsComponent implements OnInit {
  category: Category[] = [
    new Category("Arzt"),
    new Category("Auto")
  ]
  billCategory: string = "";
  constructor(private headerService: HeaderService, private http: HttpClient,
    private prvUserService: PrvUserServiceService, private billService: BillService,
    private router: Router) { }
  public input: string = "";

  uid: String;
  bill: Bill[];
  bills: Bill[];
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
    this.input = "";
  }

  billClick(id: String) {
    // alert(id);
    console.log(id);
  }

ngOnInit(){
    if (!this.prvUserService.getUser()) {
      this.router.navigate(["/signin"]);
    } else {
      this.uid = this.prvUserService.getUID();

      this.headerService.setHeader(true);

      this.getPayed();
      if (this.bill == null) {
        this.getPayed();
      }

    }
    
  }
  getPayed(){
    this.http
    .get<{ bills: Bill[] }>("http://localhost:3000/api/prvusers/" + this.uid + "/bills")
    .subscribe(responseData => {
      this.bill = responseData.bills;
    });
  }
}
