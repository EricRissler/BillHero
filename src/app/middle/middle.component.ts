import { Component, OnInit } from "@angular/core";
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

  constructor() {}

  ngOnInit() {}
}
