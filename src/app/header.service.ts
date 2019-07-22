import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HeaderService {
  changeHeader = false;

  
  subscribe: any;

  constructor() {
  }

  setHeader(headerChange: boolean) {
    this.changeHeader = headerChange;
  }

  getHeader() {
    return this.changeHeader;
  }
}
