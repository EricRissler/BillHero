import { Component, OnInit } from "@angular/core";
import { HeaderService } from '../header.service';

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    this.headerService.setHeader(true);
  }
}
