import { Component, OnInit } from "@angular/core";

declare var require: any;

@Component({
  selector: "app-header-login",
  templateUrl: "./header-login.component.html",
  styleUrls: ["./header-login.component.css"]
})
export class HeaderLoginComponent {
  private logo = require("../../../assets/img/Logo3.png");
  public changeheader: boolean = false;
  public show: boolean = false;
  //public login: any = "Login";

  toggleheader() {
    this.changeheader = !this.changeheader;
  }

  toggle() {
    this.show = !this.show;

    // if (this.show) this.login = "Login";
    // else this.login = "Login";
  }
  constructor() {}

  ngOnInit() {}
}
