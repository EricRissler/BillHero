import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public tausch: boolean = false;

  receiveChange($event) {
    this.tausch = $event;
  }
}
