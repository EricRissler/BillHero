import { Component, OnInit } from "@angular/core";
import { ComUserService } from "src/app/com-user.service";

declare var require: any;

@Component({
  selector: "app-business-login",
  templateUrl: "./business-login.component.html",
  styleUrls: ["./business-login.component.css"]
})
export class BusinessLoginComponent implements OnInit {
  private Billy = require("../../../assets/img/Billy.png");

  mail: string;
  password: string;

  constructor(private comUserService: ComUserService) {}

  commitUserData() {
    this.comUserService.Signin(this.mail, this.password);
  }

  ngOnInit() {}
}
