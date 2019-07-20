import { Component, OnInit } from "@angular/core";
declare var require: any;
@Component({
  selector: "app-bottom",
  templateUrl: "./bottom.component.html",
  styleUrls: ["./bottom.component.css"]
})
export class BottomComponent implements OnInit {
  private Image1 = require("../../../assets/img/front1.png");
  private Image2 = require("../../../assets/img/front2.png");
  private Image3 = require("../../../assets/img/front3.png");
  private Image4 = require("../../../assets/img/Logo2.png");

  constructor() {}

  ngOnInit() {}
}
