import { Component, OnInit } from "@angular/core";
import { Item } from '../shared/item.model';
import { HeaderService } from '../header.service';
@Component({
  selector: "app-bill-detail",
  templateUrl: "./bill-detail.component.html",
  styleUrls: ["./bill-detail.component.css"]
})
export class BillDetailComponent implements OnInit {
  public price = "3242";

  items: Item[] = [
    new Item("PC",3000),
    new Item("HDMI Kabel", 240),
    new Item("Maus", 2)
  ];
  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.setHeader(true);
   }
}
