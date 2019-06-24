import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public tausch: boolean = false;

  public userid: string;

  headerChange() {
    if (this.userid == null) {
    } else {
    }
  }

  receiveChange($event) {
    this.tausch = $event;
  }
}
