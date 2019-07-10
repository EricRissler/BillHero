import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

declare var require: any;

@Component({
  selector: "app-business-register",
  templateUrl: "./business-register.component.html",
  styleUrls: ["./business-register.component.css"]
})
export class BusinessRegisterComponent implements OnInit {
  private Billy = require("../../../assets/img/Billy.png");

  country: string;
  companylong: string;
  companyshort: string;
  mail: string;
  password: string;
  passwordagain: string;
  streetandnumber: string;
  additional: string;
  postcode: string;
  place: string;

  step: number = 1;

  constructor(private http: HttpClient) {}

  postComUser() {
    console.log("YAAAY");
    this.http
      .post<{ message: String }>("http://localhost:3000/api/comusers", {
        country: this.country,
        longname: this.companylong,
        shortname: this.companyshort,
        email: this.mail,
        password: this.password,
        strHouseNr: this.streetandnumber,
        additional: this.additional,
        zip: this.postcode,
        city: this.place
      })
      .subscribe(resonseData => {
        console.log(resonseData.message);
      });
  }

  changestep() {
    this.step = this.step + 1;
    console.log(this.step);
  }

  ngOnInit() {}
}
