import { Component, OnInit } from "@angular/core";

declare var require: any;

@Component({
  selector: "app-business-register",
  templateUrl: "./business-register.component.html",
  styleUrls: ["./business-register.component.css"]
})
export class BusinessRegisterComponent implements OnInit {
  private Billy = require("../../../assets/img/Billy.png");

  land: string = "";
  firstname: string = "";
  lastname: string = "";
  mail: string = "";
  password: string = "";
  passwordagain: string = "";
  company: string = "";
  streetandnumber: string = "";
  adressplus: string = "";
  postcode: string = "";
  place: string = "";
  birth: string = "";

  step: number = 1;

  changestep() {
    this.step = this.step + 1;
    console.log(this.step);
  }

  constructor() {}

  ngOnInit() {}
}
