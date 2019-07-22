import { Component, OnInit } from "@angular/core";
import { HeaderService } from '../header.service';
@Component({
  selector: "app-middle",
  templateUrl: "./middle.component.html",
  styleUrls: ["./middle.component.css"]
})
export class MiddleComponent implements OnInit {
  

  getUrl() {
    return "src('../../assets/Bilder/Logo.png')";
  }

  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    this.headerService.setHeader(false);
  }
}
