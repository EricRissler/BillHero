import { Component, OnInit } from "@angular/core";
import { SigninComponent } from "../signin/signin.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor() {}

  public penis: string = "comp1";
  public tausch: boolean = true;

  receiveChange($event) {
    this.tausch = $event;
  }

  ngOnInit() {}
}
