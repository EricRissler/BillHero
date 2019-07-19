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
export class ComUserService {
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
    this.http
      .get<{
        id: string;
        email: string;
      }>("http://localhost:3000/api/comusers", { headers })
      .subscribe(responseData => {
        this.id = responseData.id;
        this.mail = responseData.email;
        this.router.navigate(["/businessDashboard"]);
      });
  }

  getUser() {
    return this.firstname;
  }

  getComID() {
    return this.id;
  }
}
