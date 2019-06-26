import { Component, OnInit } from "@angular/core";
declare var require: any;
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  private Billy = require("../../assets/img/Billy.png");

  step: number = 1;

  constructor() {}

  changestep() {
    this.step = this.step + 1;
    console.log(this.step);
  }

  ngOnInit() {}
}
