import { Component, OnInit } from "@angular/core";

declare var require: any;

@Component({
  selector: "app-business-login",
  templateUrl: "./business-login.component.html",
  styleUrls: ["./business-login.component.css"]
})
export class BusinessLoginComponent implements OnInit {
  private Billy = require("../../../assets/img/Billy.png");

  constructor() {}

  ngOnInit() {}
}
