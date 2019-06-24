import { Component, OnInit } from "@angular/core";

declare var require: any;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  // public changer: string = "show";
  public tausch: boolean = true;

  private logo = require("../../assets/img/Logo3.png");
  private settings = require("../../assets/img/settings.png");
  receiveChange($event) {
    this.tausch = $event;
  }

  changer() {
    this.tausch = !this.tausch;
  }

  ngOnInit() {}
}
