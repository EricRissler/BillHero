import { Component, OnInit } from "@angular/core";

declare var require: any;
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  private netImage = require("../../assets/img/Logo3.png");

  constructor() {}

  public show: boolean = false;
  public login: any = "Login";

  ngOnInit() {}

  toggle() {
    this.show = !this.show;

    // if (this.show) this.login = "Login";
    // else this.login = "Login";
  }
}
