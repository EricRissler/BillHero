import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { RouterLink } from "@angular/router";
import { logging } from "protractor";
declare var require: any;
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  private Billy = require("../../assets/img/Billy.png");

  mail: string;

  // public change: boolean = false;

  // @Output() changeEvent = new EventEmitter<boolean>();

  // sendChange() {
  //   this.changeEvent.emit(this.change);
  // }

  ngOnInit() {}
}
