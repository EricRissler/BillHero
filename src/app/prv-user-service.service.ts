import { Injectable } from "@angular/core";

import {
  HttpClientModule,
  HttpHeaders,
  HttpClient
} from "@angular/common/http";
import { Router } from "@angular/router";
import { BillService } from "./bill.service";
import { Payment } from "./shared/Payment.model";

@Injectable({
  providedIn: "root"
})
export class PrvUserServiceService {
  logged: boolean = false;
  id: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  nationality: string;
  mail: string;
  password: string;
  namefavpay1: string;
  namefavpay2: string;
  idfavpay1: string;
  idfavpay2: string;

  constructor(private http: HttpClient, private router: Router) {}

  Signin(mail, password) {
    const headers = new HttpHeaders().set("authData", mail + ":" + password);
    this.http
      .get<{
        id: string;
        firstname: string;
        lastname: string;
        birthdate: string;
        nationality: string;
        email: string;
        idFavPaymentOne: string;
        idFavPaymentTwo: string;
        nameFavPaymentOne: string;
        nameFavPaymentTwo: string;
      }>("http://localhost:3000/api/prvusers", { headers })
      .subscribe(responseData => {
        this.id = responseData.id;
        this.firstname = responseData.firstname;
        this.lastname = responseData.lastname;
        this.birthdate = responseData.birthdate;
        this.nationality = responseData.nationality;
        this.mail = responseData.email;
        this.namefavpay1 = responseData.nameFavPaymentOne;
        this.namefavpay2 = responseData.nameFavPaymentTwo;
        this.idfavpay1 = responseData.idFavPaymentOne;
        this.idfavpay2 = responseData.idFavPaymentTwo;

        this.logged = true;
        this.router.navigate(["/dashboard"]);
      });
  }

  getUID() {
    return this.id;
  }

  getUser() {
    return this.firstname;
  }

  getLogged() {
    return this.logged;
  }

  getIDPayOne() {
    return this.idfavpay1;
  }

  getIDPayTwo() {
    return this.idfavpay2;
  }

  getNamePayOne() {
    return this.namefavpay1;
  }

  getNamePayTwo() {
    return this.namefavpay2;
  }
}
