import { Component, OnInit } from "@angular/core";
import { Item } from "../shared/item.model";
import { HeaderService } from "../header.service";
import { PrvUserServiceService } from "../prv-user-service.service";
import { Router } from "@angular/router";
import { interval } from "rxjs";
import { DetailService } from '../detail.service';
@Component({
  selector: "app-bill-detail",
  templateUrl: "./bill-detail.component.html",
  styleUrls: ["./bill-detail.component.css"]
})
export class BillDetailComponent implements OnInit {
  public price:String;
  public shortname:String;
  public items: Item[];
  public x =" x ";
  constructor(
    private headerService: HeaderService,
    private prvUserService: PrvUserServiceService,
    private detailService: DetailService,
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

    interval(500).subscribe(count => {
      this.shortname = this.detailService.getShortname();
      this.items = this.detailService.getItems();
      this.price = this.detailService.getPrice();
    });
    
  }
}
