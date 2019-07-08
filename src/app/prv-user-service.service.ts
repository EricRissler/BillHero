import { Injectable } from "@angular/core";

import {
  HttpClientModule,
  HttpHeaders,
  HttpClient
} from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class PrvUserServiceService {
  logged: boolean;
  id: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  nationality: string;
  mail: string;
  password: string;

  constructor(private http: HttpClient, private router: Router) {}

  Signin(mail, password) {
    const headers = new HttpHeaders().set("authData", mail + ":" + password);
    //TODO: Prüfen dass pw und user kein ':' enthält
    console.log(mail + password);
    this.http
      .get<{
        id: string;
        firstname: string;
        lastname: string;
        birthdate: string;
        nationality: string;
        email: string;
      }>("http://localhost:3000/api/prvusers", { headers })
      .subscribe(responseData => {
        console.log("YAY");
        console.log(responseData);

        this.id = responseData.id;
        this.firstname = responseData.firstname;
        this.lastname = responseData.lastname;
        this.birthdate = responseData.birthdate;
        this.nationality = responseData.nationality;
        this.mail = responseData.email;
        console.log("ausm Service:" + this.firstname);
        this.router.navigate(["/dashboard"]);
      });
  }

  getUser() {
    console.log("Ausm getUser:" + this.firstname);
    return this.firstname;
  }
}
