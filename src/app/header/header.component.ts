import { Component, OnInit } from "@angular/core";
import { HeaderService } from "../header.service";
import { interval } from "rxjs";

declare var require: any;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  public headerChange: boolean = true;

  private logo = require("../../assets/img/Logo3.png");
  private settings = require("../../assets/img/settings.png");

  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    interval(50).subscribe(count => {
      this.headerChange = this.headerService.getHeader();
    });
  }
}
