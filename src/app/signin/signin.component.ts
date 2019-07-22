import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { HeaderService } from "../header.service";
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule
} from "@angular/common/http";
import { Prvuser } from "../shared/prvuser.model";
import { PrvUserServiceService } from "../prv-user-service.service";

declare var require: any;
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  private Billy = require("../../assets/img/Billy.png");


  mail: string;
  password: string;
  constructor(
    private headerService: HeaderService,
    private http: HttpClient,
    private http2: HttpClientModule,
    private prvUserService: PrvUserServiceService
  ) {}

  commitUserData() {
    this.prvUserService.Signin(this.mail, this.password);
  }



  ngOnInit() {
    this.headerService.setHeader(false);
  }
}
