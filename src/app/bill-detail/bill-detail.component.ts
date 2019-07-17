import { Component, OnInit } from "@angular/core";
import { Item } from "../shared/item.model";
import { HeaderService } from "../header.service";
import { PrvUserServiceService } from "../prv-user-service.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-bill-detail",
  templateUrl: "./bill-detail.component.html",
  styleUrls: ["./bill-detail.component.css"]
})
export class BillDetailComponent implements OnInit {
  public price = "3242";

  items: Item[] = [
    new Item("PC", 3000),
    new Item("HDMI Kabel", 240),
    new Item("Maus", 2)
  ];
  constructor(
    private headerService: HeaderService,
    private prvUserService: PrvUserServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.prvUserService.getUser()) {
      this.router.navigate(["/signin"]);
    }
    this.headerService.setHeader(true);
  }
}
