import { Component, OnInit } from "@angular/core";
import { HeaderService } from "src/app/header.service";
import { PrvUserServiceService } from "src/app/prv-user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-payed",
  templateUrl: "./payed.component.html",
  styleUrls: ["./payed.component.css"]
})
export class PayedComponent implements OnInit {
  constructor(
    private headerService: HeaderService,
    private prvUserService: PrvUserServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.prvUserService.getUser()) {
      this.router.navigate(["/signin"]);
    }
    this.headerService.setHeader(true);
  }
}
