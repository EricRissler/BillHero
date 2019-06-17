import { Component, OnInit } from "@angular/core";

declare var require: any;

@Component({
  selector: "app-header-dash",
  templateUrl: "./header-dash.component.html",
  styleUrls: ["./header-dash.component.css"]
})
export class HeaderDashComponent implements OnInit {
  private logo = require("../../../assets/img/Logo3.png");

  public show: boolean = false;
  public login: any = "Login";

  toggle() {
    this.show = !this.show;

    if (this.show) this.login = "Login";
    else this.login = "Login";
  }
  constructor() {}

  ngOnInit() {}
}
