import { Component, OnInit } from "@angular/core";
import { HeaderService } from '../header.service';
//declare var require: any;
@Component({
  selector: "app-middle",
  templateUrl: "./middle.component.html",
  styleUrls: ["./middle.component.css"]
})
export class MiddleComponent implements OnInit {
  // private netImage = require("../../assets/Bilder/Top.png");

  getUrl() {
    return "src('../../assets/Bilder/Logo.png')";
  }

  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    this.headerService.setHeader(false);
  }
}
