import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { PrvUserServiceService } from '../prv-user-service.service';
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
  constructor(private http: HttpClient,private prvUserService: PrvUserServiceService,
    private router: Router) {}

  postUser() {
    console.log("YAAAY");
    this.http
      .post<{ message: String }>("http://localhost:3000/api/prvusers", {
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
      })
      .subscribe(responseData => {
        console.log(responseData.message);
        this.step=this.step+1;
      });

  }

  changestep() {
    if(this.step<2){
    this.step = this.step + 1;
    }else if (this.step==3){
      this.prvUserService.Signin(this.mail, this.password); 
    }
  }

  ngOnInit() {}
}
