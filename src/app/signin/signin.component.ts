import { Component, OnInit } from "@angular/core";
declare var require: any;
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  private Billy = require("../../assets/img/Billy.png");

  constructor() {}

  ngOnInit() {}
}
