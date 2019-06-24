import { Component, OnInit } from "@angular/core";
import { Bill } from "../shared/bill.model";
import { Category } from "../shared/category.model";

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

  public input: string = "";

  bill: Bill[] = [
    new Bill("Media Markt", "05.08.2019", 900, false),
    new Bill("Schreiner", "14.06.2019", 750, false),
    new Bill("Zahnarzt", "24.12.2019", 750, false),
    new Bill("MEWA", "01.01.2020", 750, false),
    new Bill("Media Markt", "05.08.2019", 900, true),
    new Bill("Schreiner", "14.06.2019", 750, true),
    new Bill("Zahnarzt", "24.12.2019", 750, true),
    new Bill("MEWA", "01.01.2020", 750, false),
    new Bill("Media Markt", "05.08.2019", 900, true),
    new Bill("Schreiner", "14.06.2019", 750, true),
    new Bill("Zahnarzt", "24.12.2019", 750, true),
    new Bill("MEWA", "01.01.2020", 750, false),
    new Bill("Lidl", "27.03.2020", 750, false)
  ];

  newCategory() {
    this.category.push((new Category(this.input)));
  }

  ngOnInit() {}
}
