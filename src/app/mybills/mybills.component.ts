import { Component, OnInit } from "@angular/core";
import { Bill } from "../shared/bill.model";
import { Category } from "../shared/category.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HeaderService } from "../header.service";
import { PrvUserServiceService } from "../prv-user-service.service";
import { Router } from "@angular/router";
import { BillService } from "../bill.service";
import { DetailService } from '../detail.service';

@Component({
  selector: "app-mybills",
  templateUrl: "./mybills.component.html",
  styleUrls: ["./mybills.component.css"]
})
export class MybillsComponent implements OnInit {
  category: Category[] = [];
  constructor(private headerService: HeaderService,  private http: HttpClient,
    private prvUserService: PrvUserServiceService, private billService: BillService, private detailService: DetailService,
    private router: Router) { }
  public input: string = "";

  uid: String;
  bill: Bill[];
  bills: Bill[];
 

  newCategory() {
    this.category.push((new Category(this.input)));
    this.input = "";
  }

  billClick(id: String) {
    this.detailService.getDetail(id);
  }

ngOnInit(){
    if (!this.prvUserService.getUser()) {
      this.router.navigate(["/signin"]);
    } else {
      this.uid = this.prvUserService.getUID();

      this.headerService.setHeader(true);

      this.getAll();
      if (this.bill == null) {
        this.getAll();
      }

    }
    
  }
  getAll(){
    this.http
    .get<{ bills: Bill[] }>("http://localhost:3000/api/prvusers/" + this.uid + "/bills")
    .subscribe(responseData => {
      this.bill = responseData.bills;
    });
  }
  getPayed(){
    this.uid = this.prvUserService.getUID();
    const headers = new HttpHeaders().set("status", "1");
    this.http.get<{ bills: Bill[] }>("http://localhost:3000/api/prvusers/" + this.uid + "/bills", { headers })
      .subscribe(responseData => {
        this.bill = responseData.bills;
      });
  }
  getUnpayed(){
    this.uid = this.prvUserService.getUID();
    const headers = new HttpHeaders().set("status", "0");
    this.http.get<{ bills: Bill[] }>("http://localhost:3000/api/prvusers/" + this.uid + "/bills", { headers })
      .subscribe(responseData => {
        this.bill = responseData.bills;
      });
  }
}
