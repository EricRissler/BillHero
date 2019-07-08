import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
declare var require: any;
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  private Billy = require("../../assets/img/Billy.png");

  country: string = "";
  firstname: string = "";
  lastname: string = "";
  mail: string = "";
  password: string = "";
  passwordagain: string = "";
  nationality: string = "";
  streetandnumber: string = "";
  additional: string = "";
  postcode: string = "";
  place: string = "";
  birth: string = "";

  step: number = 1;
  constructor(private http: HttpClient) {}

  postUser() {
    this.http.post("http://localhost:3000/api/prvusers", {
      country: this.country,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.mail,
      password: this.password,
      nationality: this.nationality,
      strHouseNr: this.streetandnumber,
      additional: this.additional,
      zip: this.postcode,
      city: this.place,
      bdate: this.birth
    });
  }

  changestep() {
    this.step = this.step + 1;
    console.log(this.step);
  }

  ngOnInit() {}
}
