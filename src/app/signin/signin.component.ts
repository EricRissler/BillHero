import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { HeaderService } from "../header.service";
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule
} from "@angular/common/http";
import { Prvuser } from "../shared/prvuser.model";
import { PrvUserServiceService } from "../prv-user.service";

declare var require: any;
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  private Billy = require("../../assets/img/Billy.png");

  // logged: boolean = false;

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

  // Signin() {
  //   const headers = new HttpHeaders().set(
  //     "authData",
  //     this.mail + ":" + this.password
  //   );
  //   //TODO: Prüfen dass pw und user kein ':' enthält
  //   console.log(this.mail + this.password);
  //   this.http
  //     .get<{
  //       id: string;
  //       firstname: string;
  //       lastname: string;
  //       birthdate: string;
  //       nationality: string;
  //       email: string;
  //     }>("http://localhost:3000/api/prvusers", { headers })
  //     .subscribe(responseData => {
  //       console.log("YAY");
  //       console.log(responseData);

  //     });

  // }

  ngOnInit() {
    this.headerService.setHeader(false);
  }
}
