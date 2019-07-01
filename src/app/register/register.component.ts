import { Component, OnInit } from "@angular/core";
import { HeaderService } from '../header.service';
declare var require: any;
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  private Billy = require("../../assets/img/Billy.png");

  penis: boolean = false;

  land: string = "";
  firstname: string = "";
  lastname: string = "";
  mail: string = "";
  password: string = "";
  passwordagain: string = "";
  nationality: string = "";
  streetandnumber: string = "";
  adressplus: string = "";
  postcode: string = "";
  place: string = "";
  birth: string = "";

  step: number = 1;
  constructor(private headerService: HeaderService) {}

  Values() {
    console.log("Land: " + this.land);
    console.log("firstname: " + this.firstname);
    console.log("lastname: " + this.lastname);
    console.log("mail: " + this.mail);
    console.log("password: " + this.password);
    console.log("passwordagain: " + this.passwordagain);
    console.log("nationality: " + this.nationality);
    console.log("streetandnumber: " + this.streetandnumber);
    console.log("adressplus:" + this.adressplus);
    console.log("postcode: " + this.postcode);
    console.log("Place: " + this.place);
    console.log("Birth:" + this.birth);
  }

  changestep() {
    this.step = this.step + 1;
    console.log(this.step);
  }

  disablebutton(penis) {
    if (this.land == "") {
    } else {
      this.penis = true;
    }
    return this.penis;
  }

  ngOnInit() {
   this.headerService.setHeader(false);   
  }
}
