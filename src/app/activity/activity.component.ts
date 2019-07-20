import { Component, OnInit } from "@angular/core";
import { Bill } from "../shared/bill.model";
import { HeaderService } from "../header.service";
import { PrvUserServiceService } from "../prv-user-service.service";
import { Router } from "@angular/router";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DetailService } from '../detail.service';

@Component({
  selector: "app-activity",
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.css"]
})
export class ActivityComponent implements OnInit {
  bill: Bill[];
  uid: String;
  constructor(
    private headerService: HeaderService,
    private prvUserService: PrvUserServiceService,
    private detailService: DetailService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {

    if (!this.prvUserService.getUser()) {
      this.router.navigate(["/signin"]);
    }
    this.headerService.setHeader(true);
    this.detailService.setItems();
    this.detailService.setPrice();
    this.detailService.setShortname();
    this.getPayed();
    if (this.bill == null) {
      this.getPayed();
    }
  }
  billClick(id: String) {
    this.detailService.getDetail(id);
  }

  getPayed() {
    this.uid = this.prvUserService.getUID();
    const headers = new HttpHeaders().set("status", "1");
    this.http
      .get<{ bills: Bill[] }>(
        "http://localhost:3000/api/prvusers/" + this.uid + "/bills",
        { headers }
      )
      .subscribe(responseData => {
        this.bill = responseData.bills;
      });
  }
}

